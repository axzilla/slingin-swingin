const dotenv = require('dotenv')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')

dotenv.config()

module.exports = withCSS(
  withImages({
    env: {
      NOIZE_APP_SERVER_URL: process.env.NOIZE_APP_SERVER_URL,
      NOIZE_APP_GOOGLE_ANALYTICS: process.env.NOIZE_APP_GOOGLE_ANALYTICS
    }
  })
)
