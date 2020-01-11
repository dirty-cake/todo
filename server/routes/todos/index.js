const Router = require('koa-router')
const uuid = require('uuid/v4')
const db = require('../../database')
const schemas = require('./schemas')

const router = new Router({ prefix: '/todos' })

router.get('/', async (ctx) => {
  const { userId } = await schemas.filters.validateAsync(ctx.request.query)
  const todos = db.todos.filter(todo => todo.userId === userId)
  ctx.status = 200
  ctx.response.body = todos
})

router.post('/', async (ctx) => {
  const todo = await schemas.create.validateAsync(ctx.request.body)
  db.todos.push(todo)
  ctx.status = 201
  ctx.body = null
})

router.delete('/:todoId', async (ctx) => {
  const todoId = await schemas.identifier.validateAsync(ctx.request.params.todoId)
  db.todos = db.todos.filter(todo => todo.id !== todoId)
  ctx.status = 200
  ctx.body = null
})

router.patch('/:todoId', async (ctx) => {
  const todoId = await schemas.identifier.validateAsync(ctx.request.params.todoId)
  const todo = db.todos.find(todo => todo.id === todoId)
  if (todo === undefined) {
    ctx.throw(404, 'not found')
  }
  const value = await schemas.update.validateAsync(ctx.request.body)
  Object.assign(todo, value)
  ctx.status = 200
  ctx.body = todo
})

module.exports = router.routes()
