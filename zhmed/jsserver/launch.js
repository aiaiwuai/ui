const httpserver = require("./httpserver");
const argv = require('minimist')(process.argv.slice(2));
let mqtthost = "" //default as docker
let mqttport = ""
let httpport = ""
let mqttwebsocletport = ""
const flagfolder = "/rootfs"
console.log("使用说明： \n \
nodejs launch.js -m 127.0.0.1 -h 1883 -w 9001 -p 8888 \n \
-m：mqtt host docker环境默认mqtt，主机环境默认127.0.0.1 \n \
-h: mqtt port  docker + 主机环境默认1883  \n \
-p: http port  docker + 主机环境默认8888  \n \
-w: mqtt web socket  port  docker + 主机环境默认9001 \n ");
if (argv["m"]) {
    httpserver.mqtthost = argv["m"];
} else {
    try {
        fs.statSync(flagfolder, fs.constants.F_OK)
        httpserver.mqtthost = "mqtt"
    } catch (error) {
        httpserver.mqtthost = "127.0.0.1"
    }
}
if (argv["p"]) {
    httpserver.mqttport = argv["p"];
} else {
    try {
        fs.statSync(flagfolder, fs.constants.F_OK)
        httpserver.mqttport = "1883"
    } catch (error) {
        httpserver.mqttport = "1883"
    }
}
if (argv["w"]) {
    httpserver.mqttwebsocletport = argv["w"];
} else {
    try {
        fs.statSync(flagfolder, fs.constants.F_OK)
        httpserver.mqttwebsocletport = "9001"
    } catch (error) {
        httpserver.mqttwebsocletport = "9001"
    }
}
if (argv["p"]) {
    httpserver.httpport = argv["p"];
} else {
    httpserver.httpport = 8888;
}
if (module.parent == null) {
    httpserver.httpServer.listen(httpserver.httpport)
}