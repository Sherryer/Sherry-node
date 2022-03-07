/**
 * Created by Sherry on 2017/9/5.
 */
var express = require ("express");

var app = express();

app.use('/', express.static("./static2"))

app.use('/', function (req, res) {
    res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
    res.end('1123')
})

app.listen(9000)
console.log('9000')
