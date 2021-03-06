const argv = require('minimist')(process.argv.slice(2));
var  postjson={}
try {
     postjson=require("./posttest.json")

} catch (error) {
     postjson={}
}
const allpostcmd=Object.keys(postjson);
const _ = require("lodash");
var request = require('request');
var url="http://127.0.0.1:8888/request.php";
console.log("使用说明：node posttest.js -c number");
_.forEach(allpostcmd,(cmd,index)=>{
    console.log("c:"+index+": post "+cmd+" 的模拟数据");
})
if (argv["c"]  && argv["c"]>=0) {
    let cmd=allpostcmd[argv["c"]]
    if(postjson[cmd]){
        var options = {
            uri: url,
            method: 'POST',
            json: postjson[cmd]
        };
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(cmd+"：return:") 
              console.log(body) // Print the shortened url.
            }else{
                console.log(error) 
            }
          });
    }
   

}