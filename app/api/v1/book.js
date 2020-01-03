const Router = require('koa-router')

const router = new Router({
  prefix: '/v1/book'
})


const {
  PositiveIntegerValidator,
} = require('../../validators/validator.js')

router.post('/latest', async (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.headers
  const body = ctx.request.body;
  const v = await new PositiveIntegerValidator().validate(ctx)
  console.log(v.get('path.id'), 'vvvv')
  // console.log(path)
  // console.log(query)
  // console.log(headers)
  // console.log(body)
  ctx.body = { key: 'book' }
  // const error = new Error('API Exceitoon')
  // error.error_code = 10001
  // error.status = 400
  // error.request_url = ctx.method + ctx.path
  // throw error
  /*
   * sequelize 连接数据库 配置一些数据库参数 
  */   
});




/*
 * :id
 * 传递参数的方式
 * header
 * body
 * url
*/

/*
 * 处理异常
 * 全局监听到异常
 * 根据异常输出一段有意义的提示信息
*/



/*
 * 基础数据库服务
 * 旧岛 API/项目
 * 公用性 API 公开
 * 
 * book 数据库表
 * 业务 图书业务数据
 * 
 * 
 * 
 * node.js 中间层
 * 微服务
 * 雏形
*/

module.exports = router
