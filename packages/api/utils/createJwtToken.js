const jwt = require('jsonwebtoken')

async function createJwtToken(payload) {
  try {
    const createdJwtToken = await jwt.sign(payload, process.env.SECRET_OR_KEY, {})

    return `Bearer ${createdJwtToken}`
  } catch (error) {
    if (error) throw error
  }
}

module.exports = createJwtToken
