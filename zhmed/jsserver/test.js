const url = require('url');
const mqtt = require('mqtt');
const path = require('path');
const req = require('./ejs/req');
const header = require("./headerHuicobus.json")
const respheader = require("./huicobustest.json")
const querystring = require('querystring');
const _ = require("lodash")
var localmqtt = {
    "server": "mqtt://127.0.0.1:1883"
}
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
    console.log("ON message:" + topic)
    resp=respheader["resp"];
    if (topic == 'HUICOBUS_MQTT_TOPIC_UIP2TUP') {
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