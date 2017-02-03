function getPos(ev) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    return {x: scrollLeft + ev.clientX, y: scrollTop + ev.clientY};
}
//作用获得鼠标坐标
//当用到的是有这样用
//var pos=getPos(oEvent);
//用到的x就写 pos.x 用到的y就写pos.y
