var express = require('express');
var app = express()

var history = require('connect-history-api-fallback');

var staticFileMiddleware = express.static('dist');
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);

console.log('listen 20001')
app.listen(20001)