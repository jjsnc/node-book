const Koa = require('koa')
const app = new Koa()



/*
 * 客户端兼容
*/
/*
* api 版本
*/
/*
 * v1 v2 v3 支持3个版本
 */
/*
 * api 携带版本号 
 * 方式一 路径
 * 方式二 查询参数
 * 方式三 header
*/

/*
 * 开闭原则  修改关闭 扩展开放
*/





// app.use(async (ctx, next)=> {
//     if(ctx.path==="/classic/latest" && ctx.method==="GET"){
//         ctx.body = {key:'666'}
//     }
// })

const book = require('./api/v1/book')
const classic = require('./api/v1/classic')

app.use(router.routes())
module.exports = {
    router:router
}

app.listen(3000)