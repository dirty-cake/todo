const uuid = require('uuid/v4')
const Joi = require('@hapi/joi')
const User = require('../../schemas/User')

exports.create = Joi.object({
  id: User.id.forbidden().default(() => uuid()),
  name: User.name.required(),
  login: User.login.required(),
  password: User.password.required()
})

exports.signin = Joi.object({
  login: User.login.required(),
  password: User.password.required()
})
