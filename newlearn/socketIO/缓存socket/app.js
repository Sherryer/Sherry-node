//  websocket +

const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const compression = require('compression');
const path =require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', function (socket) {
    socket.on('sendData', function (data) {
        console.log(data)
        // socket.broadcast.emit('print', data)
        io.emit("huida", '收到：'+data)
    })
});

app.use(compression());
app.use(express.static(path.resolve(__dirname + '/public')));

app.get('/test-get', (req, res, next) => {
    res.end('get-test')
})

// 404
app.use((req, res, next) => {
    res.end('404')
})
server.listen(8143, function () {
    console.log('localhost:8143')
})

