const getUser = require('./getUser.js')
const getUserByUserId = require('./getUserByUserId.js')

const users = async (client, payload, res) => {
  if (payload.function === 'getUser') {
    return await getUser(client, payload, res)
  }

  if (payload.function === 'getUserByUserId') {
    return await getUserByUserId(client, payload, res)
  }
}

module.exports = users