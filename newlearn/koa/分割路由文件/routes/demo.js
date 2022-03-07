const router = require('koa-router')()

router.get('/', function (ctx, next) {
    ctx.body = 'demo'
})

router.get('/child', function (ctx, next) {
    ctx.body = 'demo child'
})

module.exports = router
