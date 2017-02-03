var fs =require("fs");

var z = [{
    a_b:"1_2",
    b:2
}]

z = JSON.stringify(z);

fs.writeFile("a",z,function (err) {
    if(err) throw err;
    console.log(1111)
});