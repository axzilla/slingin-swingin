const jwt = require('jsonwebtoken')

const sessionTime = 604800

module.exports = async function createJwtToken(payload) {
  try {
    const createdJwtToken = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
      expiresIn: sessionTime
    })

    return `Bearer ${createdJwtToken}`
  } catch (error) {
    if (error) throw error
  }
}
