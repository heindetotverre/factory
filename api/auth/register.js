const register = async (client, payload, res) => {
  try {
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection(payload.collection)
    const existingUser = await collection.findOne({Email: payload.values.Email})
    if (existingUser) {
      res.status(200).json({
        function: 'register',
        message: 'User already exists, please << login() >>',
        registered: false
      })
    } else {
      const newUser = await collection.insertOne({
        ...payload.values,
        Unvalidated: true,
        Created: new Date().getTime()
      })
      res.status(200).json({
        function: 'register',
        message: 'User succesfully created',
        registered: true
      })
      return newUser
    }
    return existingUser
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = register