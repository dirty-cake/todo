const Router = require('koa-router')
const db = require('../../database')
const schemas = require('./schemas')

const router = new Router({ prefix: '/users' })

router.post('/', async (ctx) => {
  const user = await schemas.create.validateAsync(ctx.request.body)
  if (db.users.some(duplication => duplication.login === user.login)) {
    ctx.throw(400)
  }
  db.users.push(user)
  ctx.status = 201
  ctx.body = user
})

router.get('/signin', async (ctx) => {
  const { login, password } = await schemas.signin.validateAsync(ctx.request.query)
  const user = db.users.find(user => user.login === login)
  if (user === undefined) {
    ctx.status = 400
    ctx.body = 'ti obosravsia'
  } else if (user.password !== password) {
    ctx.status = 400
    ctx.body = 'ti obosravsia'
  } else {
    ctx.status = 200
    ctx.body = user
  }
})

module.exports = router.routes()
