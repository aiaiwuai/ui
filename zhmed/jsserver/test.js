const url = require('url');
const fs=require("fs");
const mqtt = require('mqtt');
const path = require('path');
const req = require('./ejs/req');
const header = require("./headerHuicobus.json")
const respheader = require("./huicobustest.json")
const querystring = require('querystring');
const _ = require("lodash")
const flagfolder="/rootfs"
const argv = require('minimist')(process.argv.slice(2));
const mqttlogfile = APP_PATH + "/mqttlog/reciv/";
let mqtthost="" //default as docker
let mqttport=""
console.log("使用说明： \n \
nodejs test.js -m 127.0.0.1 -h 1883 \n \
-m：mqtt host docker环境默认mqtt，主机环境默认127.0.0.1 \n \
-p: mqtt port  docker + 主机环境默认1883  \n ")
if(argv["m"]){
    mqtthost=argv["m"];
}else{
    try {
        fs.statSync(flagfolder, fs.constants.F_OK)
        mqtthost="mqtt"
    } catch (error) {
        mqtthost="127.0.0.1"
    }
}
if(argv["p"]){
    mqttport=argv["p"];
}else{
    try {
        fs.statSync(flagfolder, fs.constants.F_OK)
        mqttport="1883"
    } catch (error) {
        mqttport="1883"
    }
}
var localmqtt = {
    "server": "mqtt://"+mqtthost+":"+mqttport
}
console.log(`current mqtt connecte string:`)
console.log(localmqtt);
// '${localmqtt.toString()}`)
var timestamp = new Date().getTime();
var client = mqtt.connect(localmqtt.server, {
    username: 'usernameui',
    password: 'password',
    clientid: timestamp
});
client.subscribe('HUICOBUS_MQTT_TOPIC_TUP2UIP', function (err) {
    console.log("subscribe HUICOBUS_MQTT_TOPIC_TUP2UIR");
    err ? console.log(err) : null;
    if (!err) {
    }
})
client.subscribe('HUICOBUS_MQTT_TOPIC_UIP2TUP', function (err) {
    console.log("subscribe HUICOBUS_MQTT_TOPIC_UIP2TUP");
    err ? console.log(err) : null;
    if (!err) {

    }
})
client.on("message", function (topic, message) {
    console.log("=========================");
    console.log("ON message:" + topic)
    resp=respheader["resp"];
    resfromtup = JSON.parse(message.toString());
    console.log(resfromtup);
    console.log("=========================");

    let logfile = mqttlogfile + topic + ".log";
    try {
        fs.existsSync(logfile) && fs.unlinkSync(logfile)
    } catch (error) {
        if (error) throw error;
        console.log('文件已写入');
    }

    fs.writeFile(logfile, JSON.stringify(resfromtup,null,4), (error) => {
        if (error) throw error;
        console.log('文件已写入');
    })
    if (argv["r"] &&  topic == 'HUICOBUS_MQTT_TOPIC_UIP2TUP') {
        resfromtup = JSON.parse(message.toString());
        console.log(resfromtup);

        // console.log(resfromtup["cmdId"])
        resp["hlContent"]=respheader[respheader.responsemap[resfromtup["cmdId"]]]
        // console.log(resp)
        resp["hlContent"]["session_id"]=resfromtup["hlContent"]["session_id"];
        console.log(resp)

        client.publish('HUICOBUS_MQTT_TOPIC_TUP2UIP', JSON.stringify(resp),
                            function (Error) {
                                console.log("publish HUICOBUS_MQTT_TOPIC_TUP2UIP");
                                Error ? console.log(Error) : null;
        })

    }

})