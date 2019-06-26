const _ = require("lodash")
const huicobus = require('./headerHuicobus.json');
const commandmap = require('./commandbetweenuianduip.json');
const jsonSchemaGenerator = require('json-schema-generator');
const fs = require("fs")
const path = require("path")
const pth = path.resolve(__dirname);
const schemadir=pth+"/test/schema/";
const schemaOkCmd=[
    "ZH_Medicine_sys_config",
        "ZH_Medicine_sys_config_save",
        "ZH_Medicine_cali_config",
        "ZH_Medicine_cali_command_MoveToStart",
        "ZH_Medicine_cali_command_MoveNPoint",
        "ZH_Medicine_cali_command_shoot",
        "ZH_Medicine_cali_command_pilotstart",
        "ZH_Medicine_cali_command_pilotstop",
        "ZH_Medicine_cali_command_up",
        "ZH_Medicine_cali_command_left",
        "ZH_Medicine_cali_command_right",
        "ZH_Medicine_cali_command_down",
        "ZH_Medicine_cali_command_leftdown",
        "ZH_Medicine_cali_command_rightup",
        "ZH_Medicine_cali_mode",
        "ZH_Medicine_cali_mode_start",
        "ZH_Medicine_debug_command"
];
generateThejsonSchema()
function config_changeArrayToObj(msg){
    let originArray=msg.hlContent.parameter.groups;
    msg.hlContent.parameter.groups={};
    _.forEach(originArray,(ele)=>{
        msg.hlContent.parameter.groups[ele["groupkey"]]=ele;
        let listarray=msg.hlContent.parameter.groups[ele["groupkey"]]['list'];
        msg.hlContent.parameter.groups[ele["groupkey"]]['list']={};
        _.forEach(listarray,(e)=>{
            msg.hlContent.parameter.groups[ele["groupkey"]]['list'][e.parakey]=e;
        })
    })
    return msg;
}
function config_changeObjToArray(msg){
    let originObj=msg.hlContent.parameter.groups;
    msg.hlContent.parameter.groups=[];
    _.forEach(originObj,(ele)=>{
        msg.hlContent.parameter.groups.push(ele);
        let listarray=ele['list'];
         ele['list']=[];
        _.forEach(listarray,(e)=>{
            ele['list'].push(e);
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
        let schemafilepath=schemadir + key + ".json";
        if(_.indexOf(schemaOkCmd,key)==-1){
            let mqttJson = generateMqttJsonConstructor(key);
            let specialArra=["ZH_Medicine_sys_config_save"];
            if ("ZH_Medicine_sys_config_save"==key) {
                mqttJson=config_changeArrayToObj(mqttJson);
            }
            let schema = jsonSchemaGenerator(mqttJson);
            fs.writeFile(schemafilepath, JSON.stringify(schema,null,4), (Error) => {
                if (Error) {
                    console.log(Error);
                }
            })
        }else{
            console.log("命令:"+key+"的schema已经生成，请更改文件:"+schemafilepath);
        }
      
    })
}
module.exports={
    config_changeArrayToObj,config_changeObjToArray
} 