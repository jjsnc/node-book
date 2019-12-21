const Koa = require('koa')

const parser = require('koa-bodyparser')

const catchError = require('./middlewares/exception')

const app = new Koa()
app.use(catchError)
app.use(parser())

const InitManager = require('./core/init')

InitManager.initCore(app)

app.listen(3000)








