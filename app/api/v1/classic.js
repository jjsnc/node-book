const Router = require('koa-router')

const {
    PositiveIntegerValidator,
    ClassicValidator
} = require('../../validators/validator')

const {
    Auth
} = require('../../../middlewares/auth')


const router = new Router({
    prefix: '/v1/classic'
})



router.get('/latest', new Auth().m, async (ctx, next) => {
    console.log('66666666666')
    // // ctx.body = { key: 'classic' }
});


module.exports = router

