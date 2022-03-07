const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

// $ GET /package.json
// app.use(serve('./'));

// $ GET /hello.txt
// app.use(serve('test/fixtures'));
//
// // or use absolute paths
console.log(__dirname)
app.use(serve(__dirname + '/static'));

app.listen(3000);

console.log('listening on port 3000');
