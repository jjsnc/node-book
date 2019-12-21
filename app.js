const Koa = require('koa')

const parser = require('koa-bodyparser')

const app = new Koa()

app.use(parser())

const InitManager = require('./core/init')

InitManager.initCore(app)

app.listen(3000)








