var fs = require('fs')
var http = require('http')
var url = require('url')
var util = require('util')
var formidable = require('formidable')
var sd = require('silly-datetime')

http.createServer(function (req, res) {

  if (req.url == '/favicon.ico') return

  if (req.method.toLowerCase() == 'options') {
    console.log('req.method', req.method)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT')
    res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header')
    res.writeHead(200, {'Content-type': 'text/plain'})
    res.end('1')
    return
  }

  var pathname = url.parse(req.url).pathname
  console.log(pathname)
  if (pathname == '/') {
    fs.readFile(__dirname + '/static/upFile.html', function (err, data) {
      if (err) throw err
      res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'})
      res.end(data)
    })
  } else if (pathname == '/upload') {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
      res.setHeader('Access-Control-Allow-Origin', '*')
      // parse a file upload
      console.log(1111)
      var form = new formidable.IncomingForm()
      console.log(222)
      form.uploadDir = './upfile'
      form.parse(req, function (err, fields, files) {
        console.log(333)
        console.log('files:', files.file)
        var time = sd.format(new Date(), 'YYYYMMDDHHmmss_')
        var number = parseInt(Math.random() * 1000)


        var oldName = files.pic ? files.pic.path :files.file.path
        var name = files.pic ? files.pic.name : files.file.name
        var newName = __dirname + '/upfile/' + time + name

        // console.log('fields:', fields);
        console.log('oldName:', oldName);
        console.log('newName:', newName);

        fs.rename(oldName, newName, function () {
          res.writeHead(200, {'content-type': 'text/plain'})
          res.end(util.inspect({fields: fields, files: files}))
        })

      })
    }

  } else {
    fs.readFile(__dirname + '/static/404.html', function (err, data) {
      if (err) throw err
      res.writeHead(404, {'Content-type': 'text/html;charset=UTF-8'})
      res.end(data)
    })
  }

}).listen(8142)

console.log('listen(8142)')