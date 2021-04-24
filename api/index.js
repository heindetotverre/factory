const express = require('express')
const app = express()

const connect = require('./connect.js')
const auth = require('./auth/auth.js')
const session = require('./sessions/sessions.js')
const pages = require('./pages/pages.js')
const users = require('./users/users.js')

app.use(express.json())
app.post('/db', (req, res) => {
  dbHandler (req, res)
})

const dbHandler = async (req, res) => {
  const payload = req.body
  const client = await connect(res)

  if (!client) {
    return
  }

  if (payload.function === 'pageCheck') {
    await pages(client, payload, res)
  }

  if (payload.function === 'login' || 'register') {
    await auth(client, payload, res)
  }

  if (payload.function === 'getUser' || 'getUserByUserId') {
    await users(client, payload, res)
  }

  if (payload.function === 'setSession'
    || payload.function === 'getSession') {
    await session(client, payload, res)
  }

  if (client) {
    client.close()
  }
}

module.exports = app