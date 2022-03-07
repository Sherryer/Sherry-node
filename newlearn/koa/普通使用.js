const Koa = require('koa')
const app = new Koa()
// 引入koa-router并对其实例化
const router = require('koa-router')()
// 配置get路由
router.get('/get', function (ctx, next) {
    ctx.body = 'this is a get response!'
})
// 配置post路由
router.post('/post', function (ctx, next) {
    ctx.body = 'this is a post response!'
})
// 注册路由
app.use(router.routes(), router.allowedMethods())

app.listen(8000)
console.log('http://localhost:8000/get')

module.exports = app
