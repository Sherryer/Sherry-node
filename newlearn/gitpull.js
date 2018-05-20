var express = require('express');
var app = express();
var child = require('child_process')

// app.use(express.static('./dist'));

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
    res.writeHead(404, {"Content-type": "text/html;charset=UTF-8"});
    res.end('页面不见啦')
});

app.listen(9999);
console.log('listen 9999')