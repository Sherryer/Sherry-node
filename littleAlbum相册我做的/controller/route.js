'use strict';
const fs = require("fs");

function err (req,res){
    console.log(1111);
    fs.readFile("../public/images/404.jpg",function(err,data){
        if(err) throw err;
        res.writeHead(404,{"content-type":"text/html;charset=utf8"});
        res.end(data)
    })
}

exports.err = err;