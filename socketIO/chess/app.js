var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(8888);

app.use(express.static("./public"));

app.use(function(req,res){
    res.send("页面去火星喽")
});




io.on('connection', function(sockt){
    console.log("有一个用户链接喽");

    console.log(io.sockets.sockets);


    sockt.on("tiwen",function(message){
        console.log(message);
        // io.sockets.emit("huida",message)
        io.emit("huida",message)

    });

});







// 对所有用户发广播
// io.emit
//
// 对除了自己以外的用户发广播
// sockt.broadcast.emit
