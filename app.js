const Koa = require('koa')

const parser = require('koa-bodyparser')

const catchError = require('./middlewares/exception')
const {
    User
} = require('./app/models/user')
const app = new Koa()
app.use(catchError)
app.use(parser())

const InitManager = require('./core/init')

InitManager.initCore(app)

app.listen(3000)








