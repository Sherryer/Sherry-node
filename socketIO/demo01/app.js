var express = require("express");
var app = express();



app.use(express.static("./public"));

app.use(function(req,res){
   res.send("页面去火星喽")
});



var server = require('http').createServer(app);

var io = require('socket.io')(server);
io.on('connection', function(sockt){
    console.log("有一个用户链接喽");
    sockt.on("tiwen",function(message){
        io.emit("huida",message)
    });

});

server.listen(8888);