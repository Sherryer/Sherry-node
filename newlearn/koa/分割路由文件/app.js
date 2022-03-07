const Koa = require('koa')
const app = new Koa()
const routes = require('./routes')
app.use(routes.routes(), routes.allowedMethods())
app.listen(8000)

console.log('http://localhost:8000/demo')

module.exports = app
