var express =require('express');
var app = express()
var fs = require('fs')

var history = require('./ceshi01');

var staticFileMiddleware = express.static('dist2');
// app.use(staticFileMiddleware);
// app.use(history({
//     disableDotRule: true,
//     verbose: true
// }));
// app.use(staticFileMiddleware);

app.use(staticFileMiddleware);

app.use(function (req, res) {
    res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
    fs.readFile('./dist2/index.html', function (err, data) {
        res.end(data)
    })
})

console.log('listen 20001')
app.listen(20001)