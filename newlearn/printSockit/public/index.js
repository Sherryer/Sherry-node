window.onload = function () {
    var id = 2
    var socket = io.connect();
    var $ = function (selector) {
        return document.querySelector(selector)
    }
    $('#btn').onclick = function () {
        var value = $('#input1').value
        var value2 = $('#input2').value
        socket.emit('sendData', JSON.stringify({"id": value, "content": value2}))
    }
    socket.on('huida', (message) => {
        console.log("收到服务器消息：", message);
    })
}
