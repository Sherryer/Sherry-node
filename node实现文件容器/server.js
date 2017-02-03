var fs = require("fs");
var url = require("url");
var path = require("path");
var http = require("http");

http.createServer(function (req, res) {
    if(req.url == "/favicon.ico") return;
    var pathname = url.parse(req.url).pathname;
    if (pathname == "/") pathname = "/index.html";




    var staticRoute = "/static"+pathname;
    var staticReg = /^\/static\/.*/;

    if (staticRoute.match(staticReg)==null){
    //     console.log("路由");

        res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
        res.end("route")

    }else{
    //     console.log("静态资源");

        fs.readFile("."+staticRoute,function(err,data){
            if(err) {

                fs.readFile("./404.html",function (err, data) {
                    res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
                    res.end(data)
                })
            }else {
                var extname = path.extname(pathname);

                if(extname == ""){
                    res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
                    res.end(data)
                }else {
                    fs.readFile("./mime.json",function (err, json) {
                        if (err) throw err;
                        var mime = JSON.parse(json);
                        res.writeHead(200,{"Content-type":mime[extname.toString()]+"charset=UTF-8"});
                        res.end(data)
                    })
                }
            }
        });
    }

}).listen(8142);