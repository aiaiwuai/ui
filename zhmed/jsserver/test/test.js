var assert = require('assert');
const huicobus = require('../headerHuicobus.json');
const commandmap = require('../commandbetweenuianduip.json');
const jsonSchemaGenerator = require('json-schema-generator');
var expect = require('chai').expect;
const launch = require("../httpserver.js")
const _ = require("lodash")
var chai = require('chai');
chai.use(require('chai-json-equal'));
chai.use(require('chai-json-schema'));
const tjson = require("./test.json")
const path = require("path")
const pth = path.resolve(__dirname);
const  Ajv = require('ajv');
const schemadir=pth+"/schema/";
console.log(pth);
let url = 'http://127.0.0.1';
let port = "";
const fs = require("fs")
try {
    fs.accessSync("/rootfs");
    port = 8889
} catch (error) {
    port = 7590
}
url = url + ":" + port;
console.log(url);
generateThejsonSchema();

// eslint-disable-next-line no-unused-vars
describe("Mqtt Test", () => {
    _.forEach(tjson.mqttGen, (value, key) => {
        it("Test " + key, function (done) {
            let result = launch.generateMqttToTup(tjson.mqttGen[key].req);
            let mqtt = generateMqttJsonConstructor(tjson.mqttGen[key].req.action);
            let schemafilename=schemadir+tjson.mqttGen[key].req.action+".json";
            var data = fs.readFileSync(schemafilename);
            let jsonSchemae=JSON.parse(data.toString('utf8'));
            if(tjson.mqttGen[key].req.action=="ZH_Medicine_sys_config_save"){
                result=changeArrayToObj(result)
            }
            expect(result).to.be.jsonSchema(jsonSchemae);
            expect(result).to.be.jsonEqual(mqtt);
            done()
        })
    });
})
function changeArrayToObj(msg){
        let originArray=msg.hlContent.parameter.groups;
        msg.hlContent.parameter.groups={};
        _.forEach(originArray,(ele)=>{
            msg.hlContent.parameter.groups[ele["groupkey"]]=ele;
            let listarray=msg.hlContent.parameter.groups[ele["groupkey"]]['list'];
            msg.hlContent.parameter.groups[ele["groupkey"]]['list']={};
            _.forEach(listarray,(e)=>{
                console(e)
                msg.hlContent.parameter.groups[ele["groupkey"]]['list'][e.parakey]=e;
            })
        })
    return msg;
}
function generateMqttJsonConstructor(uiCommand) {
    let huicobusCommand = commandmap.uicmdmaptup[uiCommand];
    let mqttMsg = huicobus.TUP_HHD_HLC_MESSAGE_HEADER_UIP2TUP;
    mqttMsg.cmdId = huicobus.cmdidlist[huicobusCommand];
    mqttMsg.hlContent = huicobus[huicobusCommand.replace("_CMDID_", "_HLC_")];
    return mqttMsg;
}

function generateThejsonSchema() {
    _.forEach(commandmap.uicmdmaptup, (value, key) => {
        let mqttJson = generateMqttJsonConstructor(key);
        let specialArra=["ZH_Medicine_sys_config_save"];
        if ("ZH_Medicine_sys_config_save1"==key) {
            mqttJson=changeArrayToObj(mqttJson);
        }
        let schema = jsonSchemaGenerator(mqttJson);
        fs.writeFile(schemadir + key + ".json", JSON.stringify(schema), (Error) => {
            if (Error) {
                console.log(Error);
            }
        })
    })
}