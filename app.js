require('module-alias/register')
const Koa = require('koa')

const parser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')
const catchError = require('./middlewares/exception')
const {
    User
} = require('./app/models/user')
const app = new Koa()
app.use(catchError)
app.use(parser())

const InitManager = require('./core/init')
app.use(static(path.join(__dirname,'./static')))
InitManager.initCore(app)

app.listen(3000)








