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

/*
*  model code first 
*  创建数据库的时候思考数据表  model
*  先设计 model 然后在创建数据表
*  主题  粗到细
*  user 
*  期刊
*  movie sentence  music   扩展性 相似性
*  url pubdate title 
*  一期 一期 Model 表  
*  实体  表/model 记录本身相关信息  事务 表  映射
*
*  
*  一期一期 Model /表  1期 2期 
*  Flow  具体实体  抽象  记录业务  解决业务问题 
*  多变  具体  好 不好/坏   非常简单  繁琐
*
*
*  其实没有业务表 本质也是实体表    
*/



/*
 * 不知道怎么设计数据库  感觉
*/



module.exports = router

