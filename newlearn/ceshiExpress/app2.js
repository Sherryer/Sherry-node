/**
 * Created by Sherry on 2017/9/5.
 */
var express = require ("express");

var app = express();

app.use(express.static("./static2"))

app.listen(9999)
console.log('9999')