var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();
// app.use(express.static("./static"));

app.use(cookieParser());
app.get("/cookie",function(req,res){

    if(req.cookies.a){
        res.send("有cookie啦 他是"+req.cookies.a)
    }else{
        res.cookie("a","Sherry",{expires:new Date(Date.now()+5000)});
        res.send("没有cookie喔，我把它设为 Sherry，请刷新页面")
    }


});

app.listen(8142);