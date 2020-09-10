const dotenv = require('dotenv')
const withImages = require('next-images')

dotenv.config()

module.exports = withImages({
  reactStrictMode: false,
  env: {
    NOIZE_APP_SERVER_URL: process.env.NOIZE_APP_SERVER_URL,
    NOIZE_APP_GOOGLE_ANALYTICS: process.env.NOIZE_APP_GOOGLE_ANALYTICS
  }
})
