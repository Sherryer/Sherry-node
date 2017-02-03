var fs = require ("fs");

exports.read = function(){
    fs.readdir("../static",function (err,files){
        var file = [];

        (function iterator(i){
            if(i == files.length){
                console.log(file);
                return file
            }

            fs.stat("../static/"+files[i],function(err,stats){
                // console.log(files[i]);
                if(stats.isDirectory()){
                    file.push(files[i])
                }

                iterator(++i)
            });


        })(0)

    });
};
