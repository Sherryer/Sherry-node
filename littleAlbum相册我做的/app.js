'use strict';
const express = require("express");
const controller = require("./controller/route");



const app = express();

app.use(express.static("./public"));




app.get(controller.err)
app.listen(8140)