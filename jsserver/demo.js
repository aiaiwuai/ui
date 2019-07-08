/**
 * Created by Huang Yuanjie on 2019/7/6.
 */

const mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1:1883',{
    username:'username',
    password:'password',
    clientId:'MQTT_ZH_Medicine_DEBUG'
});
client.on('connect', function () {
    console.log('Mqtt connected.....');
    client.subscribe('MQTT_ZH_Medicine_TUP');

});
client.on('message', function (topic, message) {
    var msg = JSON.parse(message.toString());
    mqttdatabase(msg);
});

function pending(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1);
        },1000);
    });
}
async function mqttdatabase(data){
    var key = data.action;
    let msg;
    let msg2;
    let res1;
    switch(key) {
        case "mqtt_debug_start":

            res1 = await pending();



            msg = {
                action : "mqtt_debug_start_res",
                msg: "Debug mode on."
            }
            client.publish('MQTT_ZH_Medicine_UI', JSON.stringify(msg));
            msg2 = {
                action : "ZH_Medicine_Log_Update",
                msg: "Debug mode on."
            }
            client.publish('MQTT_ZH_Medicine_UI', JSON.stringify(msg2));
            return;
        case "mqtt_debug_done":
            res1 = await pending();
            msg = {
                action : "mqtt_debug_done_res",
                msg: "Debug command done."
            }
            client.publish('MQTT_ZH_Medicine_UI', JSON.stringify(msg));
            msg2 = {
                action : "ZH_Medicine_Log_Update",
                msg: "Debug command done."
            }
            client.publish('MQTT_ZH_Medicine_UI', JSON.stringify(msg2));
            return;
        case "mqtt_debug_end":
            res1 = await pending();
            msg = {
                action : "mqtt_debug_end_res",
                msg: "Debug mode off."
            }
            client.publish('MQTT_ZH_Medicine_UI', JSON.stringify(msg));
            msg2 = {
                action : "ZH_Medicine_Log_Update",
                msg: "Debug mode off."
            }
            client.publish('MQTT_ZH_Medicine_UI', JSON.stringify(msg2));
            return;
        default:
            console.log("Don't understand query key:"+key);
    }
}