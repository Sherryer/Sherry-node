/**
 * Created by sherryer on 2017/2/15.
 */
// 每次访问 数据库都新增一条数据
var express = require("express");
var app = express();

app.get("/",function (req, res) {
    res.send("hello")
});

app.listen(8142);