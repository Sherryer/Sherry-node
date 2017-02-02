var express = require("express");
var formidable = require('formidable');
var sd = require("silly-datetime");
var fs = require("fs");
var util = require('util');

var app = express();

app.set("view engine","ejs");
app.use(express.static(__dirname+"/static"));

app.post("/restful.html",function (req,res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname+"/upfile";

    form.parse(req, function(err, fields, files) {
        res.write(JSON.stringify(fields));
        res.end("haha")
    });

});

app.post("/upload",function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname+"/upfile";

    form.parse(req, function(err, fields, files) {
        var time = sd.format(new Date(), 'YYYYMMDDHHmmss_');
        var number = parseInt(Math.random()*1000);

        var oldName = files.pic.path;
        var newName = __dirname +"/upfile/"+time+files.pic.name;

        fs.rename(oldName,newName,function () {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    });

});

app.get("/student/:id",function (req, res) {
    var id = req.params["id"];
    res.send(id)
});

app.get("/ejs",function (req, res) {
   var data = {
      "news":["1",2,3,4]
   };
    res.render("views1",data)
});


app.listen(8888);