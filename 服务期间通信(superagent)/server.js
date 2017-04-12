/**
 * Created by sherryer on 2017/3/27.
 */
var express = require("express");
var app = express();
var formidable = require("formidable");

app.get("/get",function(req,res){
    res.send("this is get")
});

app.post("/post",function(req,res){

        // parse a file upload
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });


});


app.listen(9999);