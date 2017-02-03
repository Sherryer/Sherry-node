// 使用方法
//    引入后直接调用方法ajax ajax有四个参数 不用写全
//    第一个参数 是地址 url
//    第二个参数 是成功后调用的方法 function(z){自带一个参数z  z就是后台echo回来的数据(字符格式的)}
//    第三个参数 是你要往后台传送的数据 要求写成json格式 比如{"userName":"大组长"，"password":"123"}
//    第四个参数 失败后调用的函数 一般用不到  function(z){参数z是状态码 status 如果需要可以自己该源码)}
//
//    比如 你写ajax(url1,function(z){console.log(z)}) 效果是请求url1这个文件 然后把返回的数据congsole.log出来
//
//    一般情况下ajax的参数只写前三个就行最后一个不用谢
//
//    ajax2.1.min.js 是当前版本的压缩
//    再啰嗦一下写法 嘿嘿 ajax('地址',成功后调用的函数,json,失败后调用的函数可以查看返回错误代码)
//
//    注意：json的属性要与后台$_POST[属性]的属性一致
function ajax(u,f,j,l) {
    if (window.XMLHttpRequest) {
        var a = new XMLHttpRequest();
    } else {
        a = new ActiveXObject("Microsoft.XMLHTTP");
    }
    a.open("post", u + "?t=" + new Date().getTime());
    a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    if (j){
        var z='';
        for(var i in j){
            if (z==''){
                z=i+'='+j[i]
            }else {
                z=z+'&'+i+'='+j[i]
            }
        }
        a.send(z);
    }
    a.onreadystatechange = function () {
        if (a.readyState == 4) {
            if (a.status == 200) {
                f(a.responseText)
            } else {
                if (l) {
                    l(a.status)
                }
            }
        }
    }
}

