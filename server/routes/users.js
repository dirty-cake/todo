const Router = require('koa-router')
const uuid = require('uuid/v4')

const router = new Router()

const db = {
  users: [{ id: uuid(), name: 'iryna', login: 'dirtycake', password: 'piupiu' }],
  todos: [{ id: uuid(), name: '', description: '', done: false, date: null, userId: uuid() }]
}

router.get('/', ctx => ctx.body = db)

router.post('/users', (ctx) => {
  const user = {}
  if (ctx.request.body.name === '' || ctx.request.body.login === '' || ctx.request.body.password === '') {
    ctx.status = 400
    ctx.body = 'ti obosravsia'
  } else {
    user.id = uuid()
    user.name = ctx.request.body.name
    user.login = ctx.request.body.login
    user.password = ctx.request.body.password
  
    db.users.push(user)

    ctx.status = 201
    ctx.body = 'created'
  }
})

router.get('/users/signin', (ctx) => {
  const login = ctx.request.query.login
  const password = ctx.request.query.password
  if (login === '' || password === '') {
    ctx.status = 400
    ctx.body = 'ti obosravsia'
  } else {
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
  }
})

router.get('/todos', (ctx) => {
  const userId = ctx.request.query.userId
  const todos = db.todos.filter(todo => todo.userId === userId)
  ctx.status = 200
  ctx.response.body = todos
})

router.post('/todos', (ctx) => {
  const todo = {}
  todo.id = uuid()
  todo.name = ctx.request.body.name
  todo.description = ctx.request.body.description
  todo.date = ctx.request.body.date
  todo.userId = ctx.request.body.userId
  todo.done = false
  db.todos.push(todo)
  ctx.status = 201
  ctx.body = null
})

router.delete('/todos/:todoId', (ctx) => {
  const todoId = ctx.request.params.todoId
  db.todos = db.todos.filter(todo => todo.id !== todoId)
  ctx.status = 200
  ctx.body = null
})

router.patch('/todos/:todoId', (ctx) => {
  const todoId = ctx.request.params.todoId
  const todo = db.todos.find(todo => todo.id === todoId)
  if (todo === undefined) {
    ctx.throw(404, 'not found')
  }
  if ('name' in ctx.request.body) {
    todo.name = ctx.request.body.name
  }
  if ('description' in ctx.request.body) {
    todo.description = ctx.request.body.description
  }
  if ('date' in ctx.request.body) {
    todo.date = ctx.request.body.date
  }
  if ('done' in ctx.request.body) {
    todo.done = ctx.request.body.done
  }
  ctx.status = 200
  ctx.body = todo
})
module.exports = router.routes()
