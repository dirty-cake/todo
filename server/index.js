const Koa = require('koa')
const cors = require('koa2-cors')
const body = require('koa-body')
const users = require('./routes/users')
const todos = require('./routes/todos')

const app = new Koa()

app.use(cors())
app.use(body())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.isJoi) {
      ctx.status = 400
      ctx.body = err.details
    } else {
      ctx.status = err.status || 500
      ctx.body = { message: err.message }
    }
  }
})

app.use(users)
app.use(todos)

app.listen(3000, () => {
  console.log('Server is running')
})