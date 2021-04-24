const getSession = async (client, payload, res) => {
  try {
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection(payload.collection)
    const sessionResult = await collection.findOne({ tokenId:payload.values.tokenId })
    if (sessionResult) {
      await collection.findOneAndUpdate(
        { tokenId:payload.values.tokenId },
        { $set: { tokenExpires: payload.values.expires} }
      )
      res.status(200).json({
        function: 'getSession',
        message: 'Session was loaded',
        session: sessionResult
      })
      return sessionResult
    }
    res.status(200).json({
      function: 'getSession',
      message: 'No Session was found with this tokenId',
      session: false
    })
    return sessionResult
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = getSession