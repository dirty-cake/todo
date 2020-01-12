const Joi = require('@hapi/joi')
const { id: userId } = require('./User')

exports.id = Joi
  .string()
  .guid()

exports.name = Joi
  .string()
  .pattern(/^[a-zA-Z]+$/)

exports.description = Joi
  .string()
  .max(100)
  .allow('')

exports.date = Joi.object({
  day: Joi.number().integer().positive(),
  month: Joi.number().integer().min(0).max(11),
  year: Joi.number().integer().min(1900)
})

exports.done = Joi
  .boolean()

exports.userId = userId
