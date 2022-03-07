window.onload = function () {
    var $ = function (selector) {
        return document.querySelector(selector)
    }
    $('#get').onclick = function () {
        ajax('/test-get', (data) => {
            console.log(data)
        })
    }
    $('#go').onclick = function () {
        var socket = io.connect();
        $('#btn').onclick = function () {
            var value = $('#input1').value
            var value2 = $('#input2').value
            socket.emit('sendData', JSON.stringify({"id": value, "content": value2}))
        }
        socket.on('huida', (message) => {
            console.log("收到服务器消息：", message);
        })
    }
}
