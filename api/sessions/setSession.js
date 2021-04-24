const setSession = async (client, payload, res) => {
  try {
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection(payload.collection)
    const sessionResult = await collection.insertOne(payload.values)
    if (sessionResult) {
      res.status(200).json({
        function: 'setSession',
        message: 'Session was set',
        session: true
      })
    } else {
      res.status(200).json({
        function: 'setSession',
        message: 'No Session was set',
        session: true
      })
    }
    return sessionResult
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = setSession