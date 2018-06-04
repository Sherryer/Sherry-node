/**
 * Created by Sherry on 2017/9/5.
 */
var express = require ("express");

var app = express();

app.use(express.static("./static"))

app.get("/", function (req, res) {
    res.send("heihei")
})

app.listen(8142)