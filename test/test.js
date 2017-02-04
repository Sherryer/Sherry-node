var fs =require("fs");
var exec = require('child_process').exec;

exec("rm -rf ./haha",(err)=>{
console.log(err);
})
