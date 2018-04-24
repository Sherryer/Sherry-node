var http = require("http");
var url = require("url");

http.createServer(function(req, res){
    // 可以获得了 从端口号后面的路由 ／开始截取url到#（不包含#） 但是怎么识别呢 这就用到了 url模块；
    //见 url 图
    res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"})
    console.log(req.url)
    var z = url.ip
    console.log(z)
    res.end("123")


}).listen(8144);