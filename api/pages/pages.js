const pageCheck = async (client, payload, res) => {
  try {
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection(payload.collection)
    const result = await collection.find({url:'/'}).toArray()
    if (result.length) {
      res.status(200).json({
        message: 'Homepage is present, lets go there',
        page: JSON.stringify(result)
      })
    } else {
      res.status(200).json({
        message: 'Homepage not present, lets make one',
        action: 'redirect'
      })
    }
    return result
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = pageCheck