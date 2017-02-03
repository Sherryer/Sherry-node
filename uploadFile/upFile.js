var fs = require("fs");
var http = require("http");
var url = require("url");
var util = require("util");

var formidable = require('formidable');
var sd = require('silly-datetime');




http.createServer(function (req, res) {
    if(req.url == "/favicon.ico") return;

    var pathname = url.parse(req.url).pathname;
    console.log(pathname);
    if(pathname == "/"){
        fs.readFile(__dirname+"/static/upFile.html",function (err,data) {
            if (err) throw err;
            res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
            res.end(data)
        })
    }else if (pathname == "/upload"){
        if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
            // parse a file upload
            var form = new formidable.IncomingForm();

            form.uploadDir = "./upfile";
            form.parse(req, function(err, fields, files) {

                var time = sd.format(new Date(), 'YYYYMMDDHHmmss_');
                var number = parseInt(Math.random()*1000);

                var oldName = files.pic.path;
                var newName = __dirname +"/upfile/"+time+files.pic.name;

                fs.rename(oldName,newName,function () {
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received upload:\n\n');
                    res.end(util.inspect({fields: fields, files: files}));
                });

            });
        }

    }else{
        fs.readFile(__dirname+"/static/404.html",function (err,data) {
            if (err) throw err;
            res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
            res.end(data)
        })
    }

}).listen(8142);

console.log("listen(8142)");