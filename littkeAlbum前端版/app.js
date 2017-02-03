var express = require("express");
var controller = require("./controller");
var app = express();

app.use("/static",express.static("./public"));
app.set("view engine","ejs");


app.get("/",controller.showIndex);
app.get("/:albumName",controller.albumName);


app.use(function(req,res){
    res.render("err")
});


app.listen(8765);