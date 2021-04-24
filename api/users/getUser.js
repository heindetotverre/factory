const getUser = async (client, payload, res) => {
  try {
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection(payload.collection)
    const userResult = await collection.findOne({Email:payload.values.email})
    if (userResult) {
      res.status(200).json({
        message: 'User is succesfully fetched, data in payload',
        user: JSON.stringify(userResult)
      })
    } else {
      res.status(200).json({
        message: 'No user present within query parameters'
      })
    }
    return userResult
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = getUser