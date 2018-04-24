var http = require("http");
var url = require("url");
http.createServer(function(req, res) {
    var userurl = req.url
    if(userurl == "/favicon.ico") return;
    res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});

    var pathname = url.parse(userurl).pathname;

    var responseTest;

    if(pathname.substr(1,7) === "student"){
        if(/^\d{10}$/.test(pathname.substr(9))){
            responseTest = "当前学生学号为"+pathname.substr(9);
            res.end(responseTest)
        }else{
            res.end("请输入正确的学号")
        }
    }
    if(pathname.substr(1,7) === "teacher"){
        if(/^\d{10}$/.test(pathname.substr(6))){
            responseTest = "当前老师编号为"+pathname.substr(6);
            res.end(responseTest)
        }else{
            res.end("请输入正确的老师编号")
        }
    }

    res.end("请输入 /strdent/学号（10位）查询学生；/teacher/编号（6位）查询老师")
}).listen(8142)
