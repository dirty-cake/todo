const uuid = require('uuid/v4')

const userId = '3'
const db = {
  users: [{ id: userId, name: 'Kirill', login: 'dirty2', password: '1q2w3e4r' }],
  todos: Array.from({ length: 30 }, (_, index) => {
     return { id: uuid(), userId, name: `todo${index + 1}`, date: { year: 1998, month: 1, day: 9 }, done: false }
  })
}

module.exports = db
