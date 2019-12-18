const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next)=> {
    if(ctx.path==="/classic/latest" && ctx.method==="GET"){
        ctx.body = {key:'666'}
    }
})

app.listen(3000)