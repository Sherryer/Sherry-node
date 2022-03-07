const Koa = require('koa')
const app = new Koa()
// 引入koa-router
const router = require('koa-router')
// 这两行代码等同于 const router1 = require('koa-router')()
const router1 = new router()
// 为router1配置路由前缀
router1.prefix('/pre')
router1.get('/get', function (ctx, next) {
    ctx.body = 'this is a get1 response!'
})
// router2不配置路由前缀
const router2 = new router()
router2.get('/get', function (ctx, next) {
    ctx.body = 'this is a get2 response!'
})
// 注册路由
app.use(router1.routes(), router1.allowedMethods())
app.use(router2.routes(), router2.allowedMethods())

app.listen(8000)

console.log('http://localhost:8000/pre/get')

module.exports = app
