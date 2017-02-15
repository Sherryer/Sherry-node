var ejs =require("ejs");

exports.err = err;


function err (req,res){
    console.log(11111);
    res.render("err")
}