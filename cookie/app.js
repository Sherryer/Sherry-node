var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();
var fs = require("fs");
// app.use(express.static("./static"));

app.use(cookieParser());
app.get("/cookie",function(req,res){

    if(req.cookies.a){
        res.send("有cookie啦 他是"+req.cookies.a)
    }else{
        res.cookie("a","Sherry",{expires:new Date(Date.now()+5000)});
        res.send("没有cookie喔，我把它设为 Sherry 持续5s，请刷新页面")
    }


});
app.use(function(req,res){
    fs.readFile("../404.jpg", function(err, data){
        if(err) throw err;
        res.writeHead(404, {"content-type":"Image/JPG;charset=UTF-8"});
        res.end(data);
    })
});
console.log("listening",8142);
app.listen(8142);