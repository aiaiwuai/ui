const http = require("http");
const fs = require('fs');
const url = require('url');
const mqtt = require('mqtt');
const path = require('path');
const req = require('./ejs/req');
const until=require("./until")
const _ = require("lodash")
const APP_PATH = path.resolve('.');
const schemadir = APP_PATH + "/test/schema/";
const header = require("./headerHuicobus.json")
const headcommandbetweenuianduip = require("./commandbetweenuianduip.json")
const argv = require('minimist')(process.argv.slice(2));
const Ajv = require('ajv');
let mqtthost = "" //default as docker
let mqttport = ""
let httpport = ""
let mqttwebsocletport = ""
const flagfolder = "/rootfs";
const mqttlogfile = APP_PATH + "/mqttlog/send/";
// console.log("使用说明： \n \
// nodejs launch.js -m 127.0.0.1 -h 1883 -w 9001 -p 8888 \n \
// -m：mqtt host docker环境默认mqtt，主机环境默认127.0.0.1 \n \
// -h: mqtt port  docker + 主机环境默认1883  \n \
// -p: http port  docker + 主机环境默认8888  \n \
// -w: mqtt web socket  port  docker + 主机环境默认9001 \n ");
if (argv["m"]) {
    mqtthost = argv["m"];
} else {
    try {
        fs.statSync(flagfolder, fs.constants.F_OK)
        mqtthost = "mqtt"
    } catch (error) {
        mqtthost = "127.0.0.1"
    }
}
if (argv["h"]) {
    mqttport = argv["h"];
} else {
    try {
        fs.statSync(flagfolder, fs.constants.F_OK)
        mqttport = "1883"
    } catch (error) {
        mqttport = "1883"
    }
}
if (argv["w"]) {
    mqttwebsocletport = argv["w"];
} else {
    try {
        fs.statSync(flagfolder, fs.constants.F_OK)
        mqttwebsocletport = "9001"
    } catch (error) {
        mqttwebsocletport = "9001"
    }
}
if (argv["p"]) {
    httpport = argv["p"];
} else {
    httpport = 8888;
}
var localmqtt = {
    "server": "mqtt://" + mqtthost + ":" + mqttport
}
console.info("use mqtt config:"+JSON.stringify(localmqtt))
var connect = false;
var start = 0;
var responssaved = {}
var requestssave = {}
var sio = require('socket.io');

function getMoveDistanceValue(reqbody) {
    let parameter = _.find(reqbody.parameter.parameter.groups, function (o) {
        return o.groupkey == "movescaleanddir"
    });
    let item = _.find(parameter.list, (o) => {
        return o.itemkey == "distance";
    });
    let value = item.values[item.value];
    return value;
}

function getResponseRet(requestObj, resfromtup) {
    let ret = {};
    ret.ret = {};
    // ret.ret = responseret;
    // ret.ret.parameter = resfromtup.hlContent.parameter;
    ret.status = "true";
    ret.auth = "true";
    let responsret = {};
    switch (requestObj.action) {
        //{"status":"true","auth":"true","ret":"false","msg":"12345"}
        case "ZH_Medicine_cali_mode":
            if (requestObj.body.triger == "true") {
                if (resfromtup.hlContent.parameter) {
                    responsret = resfromtup.hlContent.parameter;
                } else {
                    responsret = "ture";
                }
            } else {
                responsret = "false";
            }
            // ret.auth=true;
            break;
        default:
            responsret.parameter = resfromtup.hlContent.parameter;
    }
    ret.ret = responsret;
    return ret;
}

function generateMqttToTup(requestbody) {
    let action = requestbody.action;
    switch (action) {
        case "ZH_Medicine_cali_command":
            action = action + "_" + requestbody.body.command;
            break;
        case "ZH_Medicine_cali_mode":
            if (requestbody.body.triger == "true") {
                action = action + "_start";
            }
            break;
    }
    var tupcmd = headcommandbetweenuianduip["uicmdmaptup"][action];
    // console.log("TUPCMD:" + tupcmd);
    var headparameterkey = tupcmd.replace("CMDID", "HLC");
    // console.log(tupcmd)
    jsonInput = header["TUP_HHD_HLC_MESSAGE_HEADER_UIP2TUP"];
    jsonInput.cmdId = header["cmdidlist"][tupcmd];
    // jsonInput['hlContent']=header[headparameterkey];
    jsonInput['hlContent'] = getHlcontent(requestbody.action, requestbody.body, headparameterkey); // header[headparameterkey];
    // console.log(jsonInput)
    let logfile = mqttlogfile + action + ".log";
    try {
        fs.existsSync(logfile) && fs.unlinkSync(logfile)
    } catch (error) {
        if (error) throw error;
        console.log('文件已写入');
    }

    let schemafilename = schemadir + action + ".json";
    console.log(schemafilename);
    
    var data = fs.readFileSync(schemafilename);
    let jsonSchemae = JSON.parse(data.toString('utf8'));
    var ajv = new Ajv({
        coerceTypes: 'array',
        schemaId: 'id'
    });
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
    var validate = ajv.compile(jsonSchemae);
    jsonInput=valibefore(jsonInput,action);
    if(!validate(jsonInput)){
       console.log(validate.errors);
    }
    jsonInput=valiafter(jsonInput,action);
    // console.log(jsonInput);
    fs.writeFile(logfile, JSON.stringify(jsonInput,null,4), (error) => {
        if (error) throw error;
        console.log('文件已写入');
    })
    return jsonInput;
    // console.log(jsonInput)
}
function valibefore(jinput,action){
    let json=jinput;
    switch(action){
        case "ZH_Medicine_sys_config_save":
                json=until.config_changeArrayToObj(jinput)
            break;

    }
    return json;

}
function valiafter(jinput,action){
    let json=jinput;
    switch(action){
        case "ZH_Medicine_sys_config_save":
                json=until.config_changeObjToArray(jinput)
            break;

    }
    return json;

}
function getHlcontent(action, body, headparameterkey) {
    let hlContentDefined = header[headparameterkey];
    // console.log("action:" + action)
    switch (action) {
        case "ZH_Medicine_sys_config_save":
            hlContentDefined.parameter = body.parameter;
            break;
        case "ZH_Medicine_debug_command":
            hlContentDefined.parameter.cmdid = body.command;
            ["par1", "par2", "par3", "par4"].forEach(key => {
                let item = _.find(body.parameter.parameter.groups[0].list, (o) => {
                    return o.parakey == key
                })
                hlContentDefined.parameter[key] = item.items[item.value];
            });
            break;
        case "ZH_Medicine_cali_mode":
            if (body.triger == true) {
                hlContentDefined = "true";
            } else {
                switch (body.action) {
                    case "save":
                        hlContentDefined.parameter.saveornot = true;
                        break;
                    default:
                        hlContentDefined.parameter.saveornot = false;
                }
                break;
            }
            break;
        case "ZH_Medicine_cali_command":
            switch (body.command) {
                case "up":
                    hlContentDefined.parameter.actual_delta_z_um = 0;
                    hlContentDefined.parameter.expected_delta_x_um = 0;
                    hlContentDefined.parameter.expected_delta_y_um = getMoveDistanceValue(body)
                    break;
                case "left":
                    hlContentDefined.parameter.actual_delta_z_um = 0;
                    hlContentDefined.parameter.expected_delta_y_um = 0;
                    hlContentDefined.parameter.expected_delta_x_um = -getMoveDistanceValue(body)
                    break;
                case "down":
                    hlContentDefined.parameter.actual_delta_z_um = 0;
                    hlContentDefined.parameter.expected_delta_x_um = 0;
                    hlContentDefined.parameter.expected_delta_y_um = -getMoveDistanceValue(body)
                    break;
                case "right":
                    hlContentDefined.parameter.actual_delta_z_um = 0;
                    hlContentDefined.parameter.expected_delta_y_um = 0;
                    hlContentDefined.parameter.expected_delta_x_um = getMoveDistanceValue(body)
                    break;
                case "MoveNPoint":
                    let parameter = _.find(body.parameter.parameter.groups, function (o) {
                        return o.groupkey == "movesetting"
                    });
                    let item = _.find(parameter.list, (o) => {
                        return o.itemkey == "movetoxhole";
                    });
                    hlContentDefined.parameter.target_hole_n = item.value;
                    break;
            }
            break;
        default:
            return header[headparameterkey];

    }

    return hlContentDefined;


}
// req.prepareconf();
var httpServer = http.createServer(function (request, response) {
    //console.log(request.url);
    var pathname = url.parse(request.url, false).pathname;
    var ext = pathname.match(/(\.[^.]+|)$/)[0];
    var Data = "";
    switch (ext) {
        case ".css":
            // console.log("Client require :"+pathname);
            Data = fs.readFileSync(APP_PATH + "/../ui" + pathname, 'utf-8');
            response.writeHead(200, {
                "Content-Type": "text/css"
            });
            response.write(Data);
            response.end();
            break;
        case ".js":
            // console.log("Client require :"+pathname);
            Data = fs.readFileSync(APP_PATH + "/../ui" + pathname, 'utf-8');
            response.writeHead(200, {
                "Content-Type": "application/javascript"
            });
            response.write(Data);
            response.end();
            break;
        case ".map":
            // console.log("Client require :"+pathname);
            Data = fs.readFileSync(APP_PATH + "/../ui" + pathname, 'utf-8');
            response.writeHead(200, {
                "Content-Type": "application/javascript"
            });
            response.write(Data);
            response.end();
            break;
        case ".ico":

            // console.log("Client require :"+pathname);
            //Data = fs.readFileSync(".."+pathname,'binary');
            response.writeHead(200, {
                "Content-Type": "image/x-ico"
            });
            //response.write(Data);
            //response.end();
            var file = APP_PATH + "/../ui" + pathname;
            fs.stat(file, function (err, stat) {
                var img = fs.readFileSync(file);
                response.contentType = 'image/x-ico';
                response.contentLength = stat.size;
                response.end(img, 'binary');
            });
            break;
        case ".png":
            // console.log("Client require :"+pathname);
            //Data = fs.readFileSync(".."+pathname,'binary');
            response.writeHead(200, {
                "Content-Type": "image/png"
            });

            //fs.createReadStream(".."+pathname, 'utf-8').pipe(response);
            //response.write(Data);
            //response.end();
            var file = APP_PATH + "/../ui" + pathname;
            fs.stat(file, function (err, stat) {
                var img = fs.readFileSync(file);
                response.contentType = 'image/png';
                response.contentLength = stat.size;
                response.end(img, 'binary');
            });
            break;
        case ".jpg":
            // console.log("Client require :"+pathname);
            //Data = fs.readFileSync(".."+pathname,'binary');
            response.writeHead(200, {
                "Content-Type": "image/jpg"
            });

            //fs.createReadStream(".."+pathname, 'utf-8').pipe(response);
            //response.write(Data);
            //response.end();
            var file = APP_PATH + "/../ui" + pathname;
            fs.stat(file, function (err, stat) {
                try {
                    var img = fs.readFileSync(file);
                    response.contentType = 'image/jpg';
                    response.contentLength = stat.size;
                    response.end(img, 'binary');
                } catch (error) {

                }

            });
            break;
        case ".gif":
            // console.log("Client require :"+pathname);
            //Data = fs.readFileSync(".."+pathname,'binary');
            response.writeHead(200, {
                "Content-Type": "image/gif"
            });

            //fs.createReadStream(".."+pathname, 'utf-8').pipe(response);
            //response.write(Data);
            //response.end();
            var file = APP_PATH + "/../ui" + pathname;
            fs.stat(file, function (err, stat) {
                var img = fs.readFileSync(file);
                response.contentType = 'image/gif';
                response.contentLength = stat.size;
                response.end(img, 'binary');
            });
            break;
        case ".swf":
            // console.log("Client require :"+pathname);
            //Data = fs.readFileSync(".."+pathname,'binary');
            //response.writeHead(200, {"Content-Type": "application/x-shockwave-flash"});

            //fs.createReadStream(".."+pathname, 'utf-8').pipe(response);
            //response.write(Data);
            //response.end();
            var file = APP_PATH + "/../ui" + pathname;
            fs.stat(file, function (err, stat) {
                var swf = fs.readFileSync(file);
                response.contentType = 'application/x-shockwave-flash';
                response.contentLength = stat.size;
                response.end(swf, 'binary');
            });
            break;
        case ".woff":
            // console.log("Client require :"+pathname);
            //Data = fs.readFileSync(".."+pathname,'binary');
            response.writeHead(200, {
                "Content-Type": "application/x-font-woff"
            });
            //response.write(Data);
            //response.end();
            var file = APP_PATH + "/../ui" + pathname;
            fs.stat(file, function (err, stat) {
                var img = fs.readFileSync(file);
                response.contentType = 'application/font-woff';
                response.contentLength = stat.size;
                response.end(img, 'binary');
            });
            break;
        case ".woff2":
            // console.log("Client require :"+pathname);
            //Data = fs.readFileSync(".."+pathname,'binary');
            response.writeHead(200, {
                "Content-Type": "font/woff2"
            });
            //response.write(Data);
            //response.end();
            var file = APP_PATH + "/../ui" + pathname;
            fs.stat(file, function (err, stat) {
                var img = fs.readFileSync(file);
                response.contentType = 'font/woff2';
                response.contentLength = stat.size;
                response.end(img, 'binary');
            });
            break;
        case ".ttf":
            // console.log("Client require :"+pathname);
            //Data = fs.readFileSync(".."+pathname,'binary');
            response.writeHead(200, {
                "Content-Type": "video/mpeg4"
            });
            //response.write(Data);
            //response.end();
            var file = APP_PATH + "/../ui" + pathname;
            fs.stat(file, function (err, stat) {
                var img = fs.readFileSync(file);
                response.contentType = 'video/mpeg4';
                response.contentLength = stat.size;
                response.end(img, 'binary');
            });
            break;
        case ".mp4":
            // console.log("Client require :"+pathname);
            //Data = fs.readFileSync(".."+pathname,'binary');
            response.writeHead(200, {
                "Content-Type": "application/x-font-ttf"
            });
            //response.write(Data);
            //response.end();
            var file = APP_PATH + "/../ui" + pathname;
            fs.stat(file, function (err, stat) {
                var img = fs.readFileSync(file);
                response.contentType = 'application/x-font-ttf';
                response.contentLength = stat.size;
                response.end(img, 'binary');
            });
            break;
        case ".html":
            // console.log("Client require :"+pathname);
            Data = fs.readFileSync(APP_PATH + "/../ui" + pathname, 'utf-8');
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            response.write(Data);
            response.end();
            break;
        case ".svg":
            // console.log("Client require :"+pathname);
            Data = fs.readFileSync(APP_PATH + "/../ui" + pathname, 'utf-8');
            response.writeHead(200, {
                "Content-Type": "image/svg+xml"
            });
            response.write(Data);
            response.end();
            break;
        case ".php":
            //2 different PHP file:dump.php&request.php
            var filename = pathname.replace(/^.*\/|\..*$/g, "");
            // console.log("Client require PHP file :" + filename);
            if (filename == "request") {
                // console.log("Client require :"+pathname);
                var str = "";
                var res = req.msg;
                request.on("data", function (chunk) {

                    str += chunk;
                });
                request.on("end", function (chunk) {
                    var timestamp = new Date().getTime();
                    // console.log("post data:" + str);
                    var requestObj = JSON.parse(str);
                    until.logPostJsonByHuicobuscmd(requestObj);
                    var action = requestObj.action;
                    //下列action 需要走mqtt
                    actionsMqttArray = [
                        // "ZH_Medicine_cali_config",
                        "ZH_Medicine_cali_command",
                        "ZH_Medicine_sys_config",
                        "ZH_Medicine_sys_config_save",
                        "ZH_Medicine_cali_mode",
                        "ZH_Medicine_debug_command"
                    ]

                    if (_.indexOf(actionsMqttArray, action) >= 0) {
                        var resfromtup = {};
                        console.log("start ");
                        var ts = new Date().getTime();
                        //request bundle
                        responssaved[ts] = response;
                        requestssave[ts] = requestObj;
                        jsonInput = generateMqttToTup(requestObj);

                        // switch (action) {
                        //     case "ZH_Medicine_cali_command":
                        //         action = action + "_" + requestObj.body.command
                        // }
                        // console.log("action:" + action);
                        // var tupcmd = headcommandbetweenuianduip["uicmdmaptup"][action];
                        // console.log("TUPCMD:" + tupcmd);
                        // var headparameterkey = tupcmd.replace("CMDID", "HLC");
                        // console.log(tupcmd)
                        // jsonInput = header["TUP_HHD_HLC_MESSAGE_HEADER_UIP2TUP"];
                        // jsonInput.cmdId = header["cmdidlist"][tupcmd];
                        // jsonInput['hlContent'] = header[headparameterkey];
                        // console.log(jsonInput)
                        // switch (action) {
                        //     case "ZH_Medicine_sys_config":
                        //         break;
                        //     case "ZH_Medicine_sys_config_save":
                        //         jsonInput['hlContent']["parameter"] = str;
                        // }
                        // if (requestObj.action == "ZH_Medicine_sys_config") {
                        //     jsonInput['hlContent'] = header["TUP_HHD_HLC_SYS_GET_CONFIG_REQ"];
                        //     // jsonInput['cmdId'] = 0x0A86;
                        // } else {
                        //     jsonInput['hlContent'] = header["TUP_HHD_HLC_SYS_SET_CONFIG_REQ"];
                        //     jsonInput['cmdId'] = 0x0A87;
                        // }
                        jsonInput['hlContent']["session_id"] = ts;
                        // console.log(JSON.stringify(jsonInput))
                        var client = mqtt.connect(localmqtt.server, {
                            username: 'usernameui',
                            password: 'password',
                            clientid: ts
                        });
                        client.subscribe('HUICOBUS_MQTT_TOPIC_TUP2UIP', function (err) {
                            console.log("subscribe HUICOBUS_MQTT_TOPIC_TUP2UIR");
                            err ? console.log(err) : null;
                            if (!err) {

                            }
                        })
                        client.publish('HUICOBUS_MQTT_TOPIC_UIP2TUP', JSON.stringify(jsonInput),
                            function (Error) {
                                console.log("publish HUICOBUS_MQTT_TOPIC_UIR2TUP");
                                Error ? console.log(Error) : null;
                            })
                        client.on("error", function () {
                            console.log("connect mqtt error");
                        })
                        client.on("message", function (topic, message) {
                            console.log("ON message:" + topic)
                            if (topic == 'HUICOBUS_MQTT_TOPIC_TUP2UIP') {
                                resfromtup = JSON.parse(message.toString());
                                //当前response
                                var respc;
                                if (responssaved[resfromtup['hlContent']["session_id"]] != null) {
                                    respc = responssaved[resfromtup["hlContent"]["session_id"]];
                                    respc.writeHead(200, {
                                        'Content-Type': 'text/html;charset=utf-8'
                                    });
                                    console.log("resfromtup");
                                    console.log(resfromtup);
                                    // var ret = {};

                                    console.log("requestObj.action:" + action);
                                    // console.log(requestObj.action)
                                    // console.log(resfromtup.src +"-+-+-"+ resfromtup.src.hlContent +"-+-+-"+ resfromtup.src.hlContent.action +"-+-+-"+requestObj.action)
                                    if (resfromtup.destId == jsonInput.srcId) {
                                        // ret.ret = {};
                                        let responseret = getResponseRet(requestssave[resfromtup['hlContent']["session_id"]], resfromtup);
                                        // ret.ret = responseret;
                                        // ret.ret.parameter = resfromtup.hlContent.parameter;
                                        // ret.status = true;
                                        // response.send(JSON.stringify(ret));
                                        // console.log("write response" + JSON.stringify(ret));
                                        respc.sta
                                        respc.writeHead(200, {
                                            'Content-Type': 'text/plain;charset=utf-8'
                                        });
                                        try {
                                            respc.finished?"":respc.write(JSON.stringify(responseret));
                                        } catch (error) {
                                            return {}
                                        }
                                        console.log("end  mqtt client");
                                        client.end();
                                        console.log("end  response");
                                        respc.end();
                                        console.log("end  response");
                                        // req.mqttclient.end(true)
                                    }
                                } else {}



                            }

                        })
                    } else {
                        var ret = req.database(JSON.parse(str));
                        response.write(ret);
                        response.end();
                    }

                    //var arg=querystring.parse(str);
                    //console.log(arg);

                    // console.log("Server response :"+ret);

                });
                /*
                request.on("end",function(chunk){
                    str+=chunk;
                });*/

            } else if (filename = "upload") {
                var para_name = "id";
                var reg = new RegExp("(^|&)" + para_name + "=([^&]*)(&|$)", "i");
                var id = request.url.substring(request.url.indexOf("=") + 1);

                console.log("User want to upload file: usr id=" + id);
                var chunks = [];
                var size = 0;
                request.on('data', function (chunk) {
                    chunks.push(chunk);
                    size += chunk.length;
                });

                request.on("end", function () {
                    var buffer = Buffer.concat(chunks, size);
                    if (!size) {
                        res.writeHead(404);
                        res.end('');
                        return;
                    }

                    var rems = [];

                    var files_head = [];
                    for (var i = 0; i < buffer.length - 1; i++) {
                        var v = buffer[i];
                        var v2 = buffer[i + 1];
                        if (v == 13 && v2 == 10) {
                            rems.push(i);
                        }
                    }
                    // first we need to get first line as seed
                    var first_line = buffer.slice(0, rems[0]).toString();

                    files_head.push(0); //First file's start is at 0
                    for (var i = 0; i < rems.length; i++) {
                        if (rems[i + 1] - rems[i] - 2 == first_line.length) {
                            if (first_line == buffer.slice(rems[i] + 2, rems[i + 1]).toString()) {
                                files_head.push(rems[i] + 2);
                                console.log("Push " + rems[i] + " into file_head");
                            }
                        }
                    } // we get every file head here
                    console.log('Upload [' + (files_head.length - 1) + "] files.");
                    for (var i = 0; i < files_head.length - 1; i++) {
                        var nbuf;
                        var web_head;
                        var filename;
                        var j = 0
                        for (; j < rems.length; j++) {
                            if (rems[j] > files_head[i]) break;
                        }
                        if (i < files_head.length - 1) {
                            nbuf = buffer.slice(rems[j + 3] + 2, files_head[i + 1] - 2);
                        } else {
                            nbuf = buffer.slice(rems[j + 3] + 2, rems[rems.length - 2]);
                        }
                        web_head = buffer.slice(rems[j] + 2, rems[j + 1]).toString();

                        filename = web_head.match(/filename=".*"/g)[0].split('"')[1];
                        console.log("Save file:" + filename);
                        var path = Save_path + "/" + filename;
                        fs.writeFileSync(path, nbuf);
                    }

                    response.writeHead(200, {
                        'Content-Type': 'text/plain;charset=utf-8'
                    });
                    response.end(JSON.stringify('Upload [' + (files_head.length - 1) + '] successfully!'));

                    //response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8'});
                    //response.end('Upload ['+files_head.length+"] files successfully!");
                });

                var file_obj = request.form;
                console.log(file_obj);

            }
            break;
        default:
            // console.log("Client require :"+pathname);
            Data = fs.readFileSync(APP_PATH + '/../ui/index.html', 'utf-8');
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            response.write(Data);
            response.end();
    }
});
var socket = sio.listen(http);
//req.req_test();
// console.log("server start......");
// client.on('connect', function () {
//     console.log('Mqtt connected.....');
//     client.subscribe('MQTT_ZH_Medicine_UI');
//     fakelog(); //TODO: This function need to remove from the real environment
//     realtimepic();
// });
// client.on('message', function (topic, message) {
//     var msg = JSON.parse(message.toString());
//     req.mqttdatabase(msg);
// });

/*
var socket = sio.listen(http);
var bstring;
fs.readFile('./img/default.jpg', function (err, data) {
    if (err) throw err
    console.log('isBuffer: ' + Buffer.isBuffer(data)) // isBuffer: true
    bstring =data;// <Buffer 72 6f ... >
});
socket.on('connection',function(socket){
    console.log("Socket.IO connected");
    socket.emit('news',{shuju:bstring});
    connect=true;
});
socket.on('disconnect',function(socket){
    console.log("Socket.IO disconnected");
    connect=false;
});
var handle=setInterval(function(){
    if(connect===false) return;
    if(!is_calibration()) return;
    fs.readFile('./jpg/'+start+'.jpg', function (err, data) {
        if (err) throw err
        console.log('isBuffer: ' + Buffer.isBuffer(data)) // isBuffer: true
        bstring =data;// <Buffer 72 6f ... >
        socket.emit('news',{shuju:bstring});
        start++;
        if(start==23) start=0;
    });
},100);*/
function realtimepic() {
    setInterval(function () {
        //console.log("what is calimode:"+req.is_calibration());
        if (!req.is_calibration()) return;
        var x = req.GetRandomNum(0, 22);
        var msg = {
            action: "ZH_Medicine_Realtime_Picture_Update",
            msg: "./jpg/" + x + ".jpg"
        }
        //console.log("send pic:"+"./jpg/"+x+".jpg");
        client.publish('MQTT_ZH_Medicine_UI', JSON.stringify(msg));
    }, 100);
}

function fakelog() {
    setInterval(function () {
        var x = req.GetRandomNum(5, 50);
        var str = "[" + x + "]:";
        for (var i = 0; i < x; i++) {
            str = str + "y ";
        }
        var msg = {
            action: "ZH_Medicine_Log_Update",
            msg: str
        }
        client.publish('MQTT_ZH_Medicine_UI', JSON.stringify(msg));
    }, 40000);
}
module.exports = {
    generateMqttToTup,
    httpServer,
    mqtthost,
    mqttport,
    httpport,
    mqttwebsocletport
}