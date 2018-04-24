/**
 * Created by Sherry on 2017/9/5.
 */
var ejs = require ("ejs");
var http = require ("http");
var fs = require("fs");

http.createServer(function (req, res) {

    fs.readFile("./views/aa.html",function (err, data) {
        if (err) throw err;
        var template = data.toString();
        var dictionary = {
            news:["哈哈哈","啊啦啦啦","嘿嘿嘿"]
        };
        var html = ejs.render(template, dictionary);

        res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
        res.end(html)
    });

}).listen(8142);