const dotenv = require('dotenv')
const withImages = require('next-images')

dotenv.config()

module.exports = withImages({
  env: {
    BOUNCE_API_URL: process.env.BOUNCE_API_URL,
    BOUNCE_GOOGLE_ANALYTICS: process.env.BOUNCE_GOOGLE_ANALYTICS
  }
})
