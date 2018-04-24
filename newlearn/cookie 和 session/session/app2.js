'use strict';
const express = require("express");
const session = require('express-session');
const app = express();

app.use(express.static("./static"))


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get('/user', function (req, res) {
    if (req.session.login) {
        req.session.cookie.maxAge = 0; // 设置 session 过期时间，从session 开始使用时 记时
        res.send("欢迎" + req.session.name);
    } else {
        res.send("你还没有登录，请访问 /login")
    }
});

app.get('/login', function(req, res) {
    req.session.login = true;
    req.session.name = 'Sherry';
    res.send('登录成功')
});

app.listen(8142);
console.log(8142);