const User = require('../../models/User')

async function getAllUsers(req, res) {
  try {
    const foundUsers = await User.find()
    res.json(foundUsers)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getAllUsers
