var assert = require('assert');
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

describe("server test",()=>{
    it("If server started",function(done){
        request(url)
        .get("/")
        .expect(200,done)
    })
})