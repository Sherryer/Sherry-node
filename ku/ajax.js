function ajax(url,fnSuc,fnFail) {
    if (window.XMLHttpRequest) {
        var ajax1 = new XMLHttpRequest();
    } else {
        ajax1 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    ajax1.open("post", url + "?t=" + new Date().getTime());
    ajax1.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    ajax1.send();
    ajax1.onreadystatechange = function () {
        if (ajax1.readyState == 4) {
            if (ajax1.status == 200) {
                fnSuc(ajax1.responseText)
            } else {
                if(fnFail){
                    fnFail(ajax1.status)
                }
            }
        }
    }
}

//$.ajax 默认值
//$.ajaxSetup({
//    url:'111.txt',
//    type:'post',
//    dataType:'html',
//    success:function(z){
//        alert(z)
//    }
//});
