const express = require("express");
const app = express();

app.use(express.static("./public"));

app.get("/:a",(req,res)=>{
    console.log(req.params)
    res.end("123")
})

console.log(8888)
app.listen(8888)