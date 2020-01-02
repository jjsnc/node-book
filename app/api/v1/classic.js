const Router = require('koa-router')

const {
    Flow
} = require('@models/flow')
const {
    Favor
} = require('@models/favor')

const {
    PositiveIntegerValidator,
    ClassicValidator
} = require('../../validators/validator')

const {
    Auth
} = require('../../../middlewares/auth')

const {
    Art
} = require('../../models/art')

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
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.art_id, flow.type)
    // const i = art.get('image')
    // const t = art.image
    // const s = art.getDataValue('image')
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeLatest)
    ctx.body = art
});


/* 下一期 */

router.get('/:index/next', new Auth().m, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: {
            index: index + 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const likeNext = await Favor.userLikeIt(
        flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeNext)
    // art.exclude = ['index','like_status']
    ctx.body = art
})

/* 上一期 */

router.get('/:index/previous', new Auth().m, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: {
            index: index - 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const likePrevious = await Favor.userLikeIt(
        flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likePrevious)
    ctx.body = art
})

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

/* 获取详情 */

router.get('/:type/:id', new Auth().m, async ctx=>{
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))

    const artDetail =await new Art(id,type).getDetail(ctx.auth.uid)

    artDetail.art.setDataValue('like_status', artDetail.like_status)
    ctx.body = artDetail.art
})



router.get('/:type/:id/favor', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))

    const artDetail =await new Art(id,type).getDetail(ctx.auth.uid)

    ctx.body = {
        fav_nums: artDetail.art.fav_nums,
        like_status: artDetail.like_status
    }
})



// 获取用户喜欢的所有列表

router.get('/favor', new Auth().m, async ctx => {
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavors(uid)
})




module.exports = router

