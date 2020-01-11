const Joi = require('@hapi/joi')

exports.id = Joi
  .string()
  .guid()

exports.name = Joi
  .string()
  .pattern(/^[a-zA-Z]+$/)

exports.login = Joi
  .string()
  .pattern(/^[a-z0-9_\-.]+$/)

exports.password = Joi
  .string()
  .min(8)
  .max(16)
