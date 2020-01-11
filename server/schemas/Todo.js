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

exports.date = Joi.object({
  day: Joi.number().integer().positive(),
  month: Joi.number().integer().min(1).max(12),
  year: Joi.number().integer().min(1900)
})

exports.done = Joi
  .boolean()

exports.userId = userId
