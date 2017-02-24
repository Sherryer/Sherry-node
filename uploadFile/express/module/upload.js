var formidable = require('formidable');
var fs= require("fs");
var util = require("util");
var sd = require('silly-datetime');
var path = require("path");


exports.upFile = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/upFile";

    form.parse(req, function(err, fields, files) {

        var time = sd.format(new Date(), 'YYYYMMDDHHmmss_');
        var number = parseInt(Math.random()*1000);

        var oldName = "./"+files.file.path;
        var newName = "./public/upFile/" + time + files.file.name;



        fs.rename(oldName,newName,function(){

            fs.readdir("./public/upFile/",function (err, data) {
                var pic = [];

                data.map(function(value){
                    var extname = path.extname(value);
                    if (extname == ".jpg" || extname == ".png" || extname == ".jpeg" || extname == ".gif") {
                        pic.push("/upfile/"+value)
                    }
                });
                pic = JSON.stringify(pic);
                // console.log(pic);
                fs.writeFile("./public/upFile/menu.txt",pic,function (err) {
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.end("done");
                });

            });


        });

    });
};