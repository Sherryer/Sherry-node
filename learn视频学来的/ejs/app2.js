/**
 * Created by Sherry on 2017/9/5.
 */

var express = require('express');
var app = express();

app.set("views", "a");
app.set("view engine", "ejs");

app.use(function(req,res){
    res.render("views1", {news: [11,22,33]})
});

app.listen(8142)