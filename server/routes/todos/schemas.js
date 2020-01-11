const uuid = require('uuid/v4')
const Joi = require('@hapi/joi')
const Todo = require('../../schemas/Todo')

exports.filters = Joi.object({
  userId: Todo.userId
})

exports.identifier = Todo.id

exports.create = Joi.object({
  id: Todo.id.forbidden().default(() => uuid()),
  name: Todo.name.required(),
  description: Todo.description,
  date: Todo.date.required(),
  done: Todo.done.forbidden().default(false),
  userId: Todo.userId.required()
})

exports.update = Joi.object({
  name: Todo.name,
  description: Todo.description,
  date: Todo.date,
  done: Todo.done
})