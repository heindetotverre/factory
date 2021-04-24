const login = async (client, payload, res) => {
  try {
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection(payload.collection)
    const user = await collection.find({Email:payload.values.Email}).toArray()
    if (user && user.length === 1) {
      res.status(200).json({
        function: 'login',
        message: 'Login was succesfull, validate hash',
        hash: user[0].Password,
        authorized: true
       })
    } else {
      res.status(200).json({
        function: 'login',
        message: 'Login was unsuccesfull',
        authorized: false
       })
    }
    return user
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = login