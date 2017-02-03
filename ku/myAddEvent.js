//obj给哪个元素加事件 ev加什么事件 fn绑的函数是什么
function myAddEvent(obj, ev, fn) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + ev, fn)
    } else {
        obj.addEventListener(ev, fn, false)
    }
}

//移除 detachEvent removeEventListener