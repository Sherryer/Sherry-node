/**
 * Created by Sherry on 2017/9/5.
 */
var express = require ("express");

var app = express();

app.use(express.static("./static"))

app.post("/", function (req, res) {
    res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
    res.end("heihei")
})

app.listen(8142)
console.log('8142')