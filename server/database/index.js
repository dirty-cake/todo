const uuid = require('uuid/v4')

const db = {
  users: [{ id: uuid(), name: 'iryna', login: 'dirtycake', password: 'piupiu' }],
  todos: [{ id: uuid(), name: '', description: '', done: false, date: null, userId: uuid() }]
}

module.exports = db
