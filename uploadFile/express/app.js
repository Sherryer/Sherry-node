var express = require("express");
var controller = require("./controller/route.js");

var app = express();
app.use(express.static("./public"));

app.post("/upload",controller.upFile);

app.listen(8142);