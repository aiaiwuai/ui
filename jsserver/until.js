const _ = require("lodash")
const huicobus = require('./headerHuicobus.json');
const commandmap = require('./commandbetweenuianduip.json');
const jsonSchemaGenerator = require('json-schema-generator');
const fs = require("fs")
const path = require("path")
const pth = path.resolve(__dirname);
var  postjson={}
try {
    postjson=require("./posttest.json")

} catch (error) {
    postjson={}
}
const schemadir=pth+"/test/schema/";
const schemaOkCmd=[
    "TUP_HHD_CMDID_SYS_GET_CONFIG_REQ",
    "TUP_HHD_CMDID_SYS_SET_CONFIG_REQ",
    "TUP_HHD_CMDID_SYS_CALI_START_REQ",
    "TUP_HHD_CMDID_SYS_CALI_LEFT_BOT_SET_REQ",
    "TUP_HHD_CMDID_SYS_CALI_RIGHT_UP_SET_REQ",
    "TUP_HHD_CMDID_SYS_CALI_MOMV_START_REQ",
    "TUP_HHD_CMDID_SYS_CALI_PIC_CAP_HOLEN_REQ",
    "TUP_HHD_CMDID_SYS_CALI_PILOT_STOP_REQ",
    "TUP_HHD_CMDID_SYS_CALI_PILOT_START_REQ",
    "TUP_HHD_CMDID_SYS_CALI_MOMV_DIR_REQ",
    "TUP_HHD_CMDID_SYS_CALI_EXIT_REQ",
    "TUP_HHD_CMDID_SYS_MENG_START_REQ",
    "TUP_HHD_CMDID_SYS_MENG_COMMAND_REQ",
    "TUP_HHD_CMDID_SYS_MENG_EXIT_REQ",
     
        "ZH_Medicine_cali_mode",
        "ZH_Medicine_cali_mode_start",
        "ZH_Medicine_debug_command"
];
// generateThejsonSchema();
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
    mqttMsg.hlContent = huicobus[uiCommand.replace("_CMDID_", "_HLC_")];
    return mqttMsg;
}

function generateThejsonSchema() {
    _.forEach(commandmap.uicmdmaptup, (value, key) => {
        value.forEach(element => {
            let schemafilepath=schemadir + element + ".json";

            console.log(element);
            
            if(_.indexOf(schemaOkCmd,element)==-1){
                let mqttJson = generateMqttJsonConstructor(element);
                let specialArra=["ZH_Medicine_sys_config_save"];
                if ("TUP_HHD_CMDID_SYS_SET_CONFIG_REQ"==element) {
                    mqttJson=config_changeArrayToObj(mqttJson);
                }
                let schema = jsonSchemaGenerator(mqttJson);
                console.log("命令:"+element+"的schema正在生成："+schemafilepath);
                fs.writeFile(schemafilepath, JSON.stringify(schema,null,4), (Error) => {
                    if (Error) {
                        console.log(Error);
                    }
                })
            }else{
                console.log("命令:"+element+"的schema更正，请更改文件:"+schemafilepath);
            }
            
        });
        
      
    })
}
function logPostJsonByHuicobuscmd(requestObj){
    if(!postjson){
        postjson={};
    }
    var action = requestObj.action;

        postjson[action]=requestObj;
    fs.writeFile("./posttest.json", JSON.stringify(postjson,null,4), (Error) => {
        if (Error) {
            console.log(Error);
        }
    })
}
module.exports={
    config_changeArrayToObj,config_changeObjToArray,logPostJsonByHuicobuscmd
} 