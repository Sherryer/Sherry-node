var fs= require("fs");

var upload = require("../module/upload");

exports.upFile = upload.upFile;
exports.err = function(req,res){
    fs.readFile("./public/err.html",function(err,data){
        if(err) throw err;
        res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
        res.end(data)
    })
};
