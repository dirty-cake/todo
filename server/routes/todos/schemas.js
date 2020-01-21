const uuid = require('uuid/v4')
const Joi = require('@hapi/joi')
const Todo = require('../../schemas/Todo')

exports.filters = Joi.object({
  limit: Joi.number().integer().positive().default(10),
  offset: Joi.number().integer().min(0).default(0)
})

exports.identifier = Todo.id

exports.create = Joi.object({
  id: Todo.id.forbidden().default(() => uuid()),
  name: Todo.name.required(),
  description: Todo.description,
  date: Todo.date.required(),
  done: Todo.done.forbidden().default(false)
})

exports.update = Joi.object({
  name: Todo.name,
  description: Todo.description,
  date: Todo.date,
  done: Todo.done
})