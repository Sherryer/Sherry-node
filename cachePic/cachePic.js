var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require('fs');
var { exec } = require('child_process');



const REG = /^data:image\/\w+;base64,/;
const PicDir = './documents/zzpic'

app.use(express.static("./documents"))

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function (req, res) {
    res.end('ok')
});

app.get('/getPic', function (req, res) {
    fs.readdir(PicDir, function (err, data) {
        if (err) {
            console.log(err)
        }
        res.end(data.toString())
    })
})

app.get('/deleteAllPic', function (req, res) {
    exec('rm -rf ' + PicDir, function (err, data) {
        res.end('ok')
    });
})

app.post('/post', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // console.log(fields.pic)
        var pic = fields.pic;
        if (pic.match(REG).length) {
            if(!fs.existsSync(PicDir)){
                fs.mkdirSync(PicDir)
            }
            savePic(pic)
        }
        // if ()
    })
    res.end('ok')
})


function savePic(data) {
    var path = PicDir + '/' + Date.now() + '.png';
    var base64 = data.replace(REG, "");
    var dataBuffer = new Buffer(base64, 'base64');
    // console.log('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer));
    fs.writeFile(path, dataBuffer, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('写入成功！');
        }
    })
}

app.listen(8888)
console.log('listen 8888')