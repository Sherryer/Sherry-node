/**
 * Created by Sherry on 2017/9/5.
 */
var express = require ("express");

var app = express();

app.get("/a.js", function (req, res) {
    res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
    setTimeout(function () {
        res.write("var b = 2;")
        setTimeout(function () {
            res.end("var a = 1;console.log('done')")
        }, 1000)
    }, 1000)
})

app.use(express.static("./static"))

app.post("/", function (req, res) {
    res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
    res.end("heihei")
})

app.listen(8142)
console.log('8142')