/**
 * Created by sherryer on 2017/3/27.
 */
var express = require("express");
var app = express();

app.get("/get",function(req,res){
    res.send("this is get")
});

app.post("/post",function(req,res){
    res.send("this is post")
});


app.listen(9999);