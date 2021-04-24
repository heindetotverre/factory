const setSession = require('./setSession.js')
const getSession = require('./getSession.js')
const removeSession = require('./removeSession.js')

const sessions = async (client, payload, res) => {
  if (payload.function === 'setSession') {
    return await setSession(client, payload, res)
  }

  if (payload.function === 'getSession') {
    await removeSession(client, res)
    return await getSession(client, payload, res)
  }
}

module.exports = sessions