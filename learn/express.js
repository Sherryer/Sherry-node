var express = require("express");
var formidable = require('formidable');  // post 请求的多彩的解决方案 formidable
var sd = require("silly-datetime");
var fs = require("fs");
var util = require('util');
var bodyParser = require('body-parser'); // post 请求的轻量级解决方案 body-parser
var app = express();

app.set("view engine","ejs");


app.use(express.static(__dirname+"/static"));
app.use(bodyParser.urlencoded({ extended: false }));



// post 请求的轻量级解决方案 body-parser

// app.post("/restful.html",function(req,res){
//     res.send(JSON.stringify(req.body))
// });



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