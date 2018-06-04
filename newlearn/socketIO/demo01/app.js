/**
 * Created by sherryer on 2017/2/16.
 */
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static("./public"));


io.on("connection",function(socket){
    console.log(socket.id)
});

server.listen(8142);