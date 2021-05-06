const removeSession = async (client, res) => {
  try {
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection('Sessions')
    const sessionResult = await collection.find().toArray()
    if (sessionResult) {
      for (const session of sessionResult) {
        const now = new Date().getTime()
        if (session.tokenExpires < now) {
          await collection.deleteOne({ tokenId:session.tokenId })
        }
      }
    }
    return sessionResult
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = removeSession