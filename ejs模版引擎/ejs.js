/**
 * Created by sherryer on 2017/2/2.
 */
var ejs = require("ejs");
var fs = require("fs");

fs.readFile("./views/aa.html",function (err, data) {
    if (err) throw err;
    var template = data.toString();
    console.log(template);
    var dictionary = {
        news:["哈哈哈","啊啦啦啦","嘿嘿嘿"]
    };
    var html = ejs.render(template, dictionary);

    console.log(html);
});

