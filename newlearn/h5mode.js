var express =require('express');
var app = express()

var history = require('connect-history-api-fallback');

var staticFileMiddleware = express.static('dist');
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);



app.use(function (req, res) {
    res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
    res.end('页面没找到')
})
console.log('listen 20001')
app.listen(20001)