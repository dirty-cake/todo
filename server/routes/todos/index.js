const Router = require('koa-router')
const auth = require('../../middlewares/auth')
const db = require('../../database')
const schemas = require('./schemas')


const router = new Router({ prefix: '/todos' })

router.get('/', auth, async (ctx) => {
  const filters = await schemas.filters.validateAsync(ctx.request.query)
  const todos = db.todos.filter(todo => todo.userId === ctx.state.userId)
  ctx.status = 200
  ctx.response.body = {
    count: todos.length,
    rows: todos.slice(filters.offset, filters.offset + filters.limit)
  }
})

router.post('/', auth, async (ctx) => {
  const todo = await schemas.create.validateAsync(ctx.request.body)
  db.todos.push({ ...todo, userId: ctx.state.userId })
  ctx.status = 201
  ctx.body = todo
})

router.delete('/:todoId', auth, async (ctx) => {
  const todoId = await schemas.identifier.validateAsync(ctx.params.todoId)
  const todoIndex = db.todos.findIndex(todo => todo.id === todoId)
  if (todoIndex === -1) {
    ctx.throw(404)
  }
  if (db.todos[todoIndex].userId !== ctx.state.userId) {
    ctx.throw(403)
  }
  db.todos.splice(todoIndex, 1)
  ctx.status = 200
  ctx.body = null
})

router.patch('/:todoId', auth, async (ctx) => {
  const todoId = await schemas.identifier.validateAsync(ctx.params.todoId)
  const todo = db.todos.find(todo => todo.id === todoId)
  if (todo === undefined) {
    ctx.throw(404, 'not found')
  }
  if (todo.userId !== ctx.state.userId) {
    ctx.throw(403)
  }
  const value = await schemas.update.validateAsync(ctx.request.body)
  Object.assign(todo, value)
  ctx.status = 200
  ctx.body = todo
})

module.exports = router.routes()
