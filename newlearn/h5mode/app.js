
var express = require('express');
var app = express()

var history = require('connect-history-api-fallback');

// var staticFileMiddleware = express.static('/Users/Sherry/my/jsProject/lazyload/dist');
var staticFileMiddleware = express.static('/Users/Sherry/work/tencent/jsproject/wxmp-AMS/build');


app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

console.log('listen 20002')
app.listen(20002)