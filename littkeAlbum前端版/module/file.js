var fs = require("fs");
var path = require("path");

exports.checkAlbum = function (callback) {
    fs.readdir(__dirname + "/../public/album/", function (err, data) {
        if (err) {
            console.log("没有找到文件夹");
            callback(err, null)
        } else {
            var files = data;


            var albums = [];
            (function iterator(i) {

                if (i == data.length) {
                    // console.log("文件夹名字：",albums);
                    callback(null, albums);
                    return
                }
                fs.stat(__dirname + "/../public/album/" + files[i], function (err, stats) {
                    if (err) {
                        callback(err, null);
                    }
                    if (stats.isDirectory()) {
                        albums.push(files[i])
                    }
                    iterator(++i);
                })

            })(0)
        }
    })
};

exports.readImages = function (album, callback) {
    console.log(album);
    fs.readdir(__dirname + "/../public/album/" + album, function (err, files) {
        var pic = [];
        files.map(function (value, index) {

            var extname = path.extname(value);
            if (extname == ".jpg" || extname == ".png" || extname == ".jpeg" || extname == ".gif") {
                pic.push("http://localhost:8765/static/album/" + album + "/" + value)
            }
        });

        callback(pic)
    });
};

