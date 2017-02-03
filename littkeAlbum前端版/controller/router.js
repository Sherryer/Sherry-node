var file = require("../module/file");

exports.showIndex = function (req, res,next) {
    var albumName = req.params.albumName;
    file.checkAlbum(function(err,callback){
        if(err){
            next();
        }
        res.send(callback)

    });

};

exports.albumName = function (req, res,next) {
    var albumName = req.params.albumName;
    file.checkAlbum(function(err,callback){
        if(err){
            next();
        }
        if(callback.indexOf(albumName)!=-1){
            file.readImages(albumName,function(data){
                res.send(data)
            })
        }else {
            next()
        }

    });

};


