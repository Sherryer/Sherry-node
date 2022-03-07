var express = require ("express");

var app = express();

app.use(express.static(__dirname + "/static"))

app.get('*', function (req, res, next) {
  res.end('123123');
})

console.log(1)

app.listen(8010)
console.log('8010')
