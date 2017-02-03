function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name]
    } else {
        return getComputedStyle(obj, false)[name];
    }
}


function SetStyle(obj, name, value) {
    if (arguments.length == 2) {
        return obj.style[name];
    } else if (arguments.length == 3) {
        obj.style[name] = value
    }
}