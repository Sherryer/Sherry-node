var express =require('express');
var app = express();
var formidable = require('formidable');


app.use(express.static("views"));
app.post('/accredit', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // console.log(fields)
        // console.log(files)
        var pic = fields.pic;
    })
    // console.log()
    res.end('accredit success')
})

app.get('/gitpull', function (req, res) {
    child.exec('git pull', function () {
        console.log('pull')
        res.redirect('/pullSuccess')
    })
})

app.get('/pullSuccess', function (req, res) {
    res.writeHead(200, {"Content-type": "text/html;charset=UTF-8"});
    res.end('soda-b 拉取成功')
})

app.use(function (req, res) {
    res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
    res.end('页面没找到')
})
console.log('listen 20001')
app.listen(20001)