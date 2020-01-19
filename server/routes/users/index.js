const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const db = require('../../database')
const schemas = require('./schemas')

const router = new Router({ prefix: '/users' })

router.post('/signup', async (ctx) => {
  const user = await schemas.create.validateAsync(ctx.request.body)
  if (db.users.some(duplication => duplication.login === user.login)) {
    ctx.throw(400)
  }
  db.users.push(user)
  const token = jwt.sign({ userId: user.id }, 'piupiu')
  ctx.status = 201
  ctx.body = { ...user, token }
})

router.post('/signin', async (ctx) => {
  const { login, password } = await schemas.signin.validateAsync(ctx.request.body)
  const user = db.users.find(user => user.login === login)
  if (user === undefined) {
    ctx.status = 400
    ctx.body = 'ti obosravsia'
  } else if (user.password !== password) {
    ctx.status = 400
    ctx.body = 'ti obosravsia'
  } else {
    const token = jwt.sign({ userId: user.id }, 'piupiu')
    ctx.status = 200
    ctx.body = { ...user, token }
  }
})

module.exports = router.routes()
