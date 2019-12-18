const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
var router = new Router();



router.get('/classic/latest', (ctx, next) => {
    if(ctx.path==="/classic/latest" && ctx.method==="GET"){
        ctx.body = {key:'666'}
    }
  });


// app.use(async (ctx, next)=> {
//     if(ctx.path==="/classic/latest" && ctx.method==="GET"){
//         ctx.body = {key:'666'}
//     }
// })

app.use(router.routes())
app.listen(3000)