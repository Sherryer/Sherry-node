const Koa = require('koa')
const app = new Koa()
const koa_router = require('koa-router')
const router = new koa_router()

router.get('/:category/:page/:id', function (ctx, next) {
    ctx.body = ctx.params
})
app.use(router.routes(), router.allowedMethods())
app.listen(8000)

console.log('localhost:8000/story/99/195c6f5b-2f71-4412-9634-bfd05f80c7c4')

module.exports = app
