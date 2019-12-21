const Router = require('koa-router')

const router = new Router();

router.post('/v1/:id/book/latest', async (ctx, next) => {
   const path = ctx.params
   const query = ctx.request.query
   const headers = ctx.request.headers
   const body = ctx.request.body;
   console.log(path)
   console.log(query)
   console.log(headers)
   console.log(body)
 ctx.body = { key: 'book' }
});


module.exports = router

/*
 * :id
 * 传递参数的方式
 * header
 * body
 * url
*/
