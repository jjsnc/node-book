const Router = require('koa-router')
var router = new Router();
router.get('/v1/book/latest', (ctx, next) => {
    ctx.body = { key: 'book' }
});

module.exports = router