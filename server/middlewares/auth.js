const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
  const token = ctx.request.headers.authorization
  const { userId } = jwt.verify(token, 'piupiu')
  ctx.state.userId = userId
  await next()
}