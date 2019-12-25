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
    /*
    *  权限 复杂
    *  限时token 角色
    *  普通用户 管理员
    *  分级 scope
    *   
    */
    console.log('66666666666')
    ctx.body = ctx.auth.uid
});


module.exports = router

