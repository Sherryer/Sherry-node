/**
 * Created by Sherry on 2017/9/5.
 */
var express = require ("express");

var app = express();

app.get("/aaa", function (req, res) {
  // res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
  res.cookie('name2', 'heiheihei');
  res.end()
})

app.get("/bbb", function (req, res) {
    // res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
    res.cookie('name', 'hahahahahahahaha');
    res.redirect('http://www.baidu.com')
})

app.use(express.static("./static"))

app.listen(8887)
console.log('8887')