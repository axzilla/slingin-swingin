const bcrypt = require('bcryptjs')

module.exports = async function hashPassword(password) {
  try {
    const createdSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, createdSalt)
    return hashedPassword
  } catch (error) {
    if (error) throw error
  }
}
