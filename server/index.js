const Koa = require('koa')
const cors = require('koa2-cors')
const body = require('koa-body')
const users = require('./routes/users')

const app = new Koa()

app.use(cors())
app.use(body())
app.use(users)

app.listen(3000, () => {
  console.log('Server is running')
})