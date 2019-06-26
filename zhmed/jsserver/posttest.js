const argv = require('minimist')(process.argv.slice(2));
const headcommandbetweenuianduip = require("./commandbetweenuianduip.json")
const allpostcmd=Object.keys(headcommandbetweenuianduip.uicmdmaptup);
const _ = require("lodash");
var request = require('request');
var url="127.0.0.1:8888";
var options = {
  uri: url,
  method: 'POST',
  json: {
    "longUrl": "http://www.google.com/"
  }
};
console.log("使用说明：node posttest.js -c number");
_.forEach(allpostcmd,(cmd,index)=>{
    console.log("c:"+index+": post "+cmd+" 的模拟数据");
})

if (argv["c"]) {
    let cmd=headcommandbetweenuianduip.uicmdmaptup[allpostcmd[argv["c"]]];
    var options = {
        uri: url,
        method: 'POST',
        json: {
          "longUrl": "http://www.google.com/"
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body.id) // Print the shortened url.
        }
      });

}