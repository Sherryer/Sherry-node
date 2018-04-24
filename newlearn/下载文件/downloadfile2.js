var request = require("request")
var fs = require('fs')

var url = 'http://localhost:8888/aa.zip'

request.get(url).on('error', function (err) {
    console.log('error')
}).pipe(fs.createWriteStream('heihei.zip'))