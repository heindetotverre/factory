const login = require('./login.js')
const register = require('./register.js')

const auth = async (client, payload, res) => {
  if (payload.function === 'login') {
    return await login(client, payload, res)
  }

  if (payload.function === 'register') {
    return await register(client, payload, res)
  }
}

module.exports = auth