const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const db = require('../../database')
const schemas = require('./schemas')


const router = new Router({ prefix: '/todos' })

router.get('/', async (ctx) => {
  const token = ctx.request.headers.authorization
  const { userId } = jwt.verify(token, 'piupiu')
  const todos = db.todos.filter(todo => todo.userId === userId)
  ctx.status = 200
  ctx.response.body = todos
})

router.post('/', async (ctx) => {
  const token = ctx.request.headers.authorization
  const { userId } = jwt.verify(token, 'piupiu')
  const todo = await schemas.create.validateAsync(ctx.request.body)
  db.todos.push({ ...todo, userId })
  ctx.status = 201
  ctx.body = todo
})

router.delete('/:todoId', async (ctx) => {
  const token = ctx.request.headers.authorization
  const { userId } = jwt.verify(token, 'piupiu')
  const todoId = await schemas.identifier.validateAsync(ctx.params.todoId)
  const todoIndex = db.todos.findIndex(todo => todo.id === todoId)
  if (todoIndex === -1) {
    ctx.throw(404)
  }
  if (db.todos[todoIndex].userId !== userId) {
    ctx.throw(403)
  }
  db.todos.splice(todoIndex, 1)
  ctx.status = 200
  ctx.body = null
})

router.patch('/:todoId', async (ctx) => {
  const token = ctx.request.headers.authorization
  const { userId } = jwt.verify(token, 'piupiu')
  const todoId = await schemas.identifier.validateAsync(ctx.params.todoId)
  const todo = db.todos.find(todo => todo.id === todoId)
  if (todo === undefined) {
    ctx.throw(404, 'not found')
  }
  if (todo.userId !== userId) {
    ctx.throw(403)
  }
  const value = await schemas.update.validateAsync(ctx.request.body)
  Object.assign(todo, value)
  ctx.status = 200
  ctx.body = todo
})

module.exports = router.routes()
