var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();
var fs = require("fs");

app.use(cookieParser());
app.get("/",function(req,res){
    // console.log(req.cookies)
    if(req.cookies.a){
        res.send("有cookie啦 他是"+req.cookies.a)
    }else{
        //httpOnly: true 字段可以让你的 cookie 不可见，删掉就可见了
        res.cookie("a","Sherry",{
            httpOnly: true,
            expires:new Date(Date.now()+5000000),
          /* 等同于 maxAge: 5000 */
        });
        res.send("没有cookie喔，我把它设为 Sherry 持续500s，请刷新页面")
    }
});
app.use(function(req,res){
    res.send("找不到页面啦")
});
console.log("listening",8142);
app.listen(8142);
