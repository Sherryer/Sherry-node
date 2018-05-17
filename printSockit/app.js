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
    })
});

app.use(compression());
app.use(express.static('public'));

// 404
app.use((req, res, next) => {

})
server.listen(3000, function () {
    console.log('3000')
})

