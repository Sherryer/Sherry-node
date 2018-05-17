var express =require('express');
var app = express()

app.use(express.static("views"));
app.use(function (req, res) {
    res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
    res.end('页面没找到')
})
console.log('listen 20001')
app.listen(20001)