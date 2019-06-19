var assert = require('assert');
const launch =require("../launch.js")
const tjson=require("./test.json")
const request = require('supertest');
let url = 'http://127.0.0.1';
let port="";
const fs=require("fs")
try {
    fs.accessSync("/rootfs");
port=8888
} catch (error) {
    port=7589

}
url = url+":"+port;
console.log(url); 
// eslint-disable-next-line no-unused-vars
const should = require('should');

describe("Mqtt Test",()=>{
    it("If server started",function(done){
        let result=launch.generateMqttToTup(tjson.mqttGen.getConf.req);
        console.log(result);;
        
      
    })
})