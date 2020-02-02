const dotenv = require('dotenv')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')

dotenv.config()

module.exports = withCSS(
  withImages({
    env: {
      BOUNCE_API_URL: process.env.BOUNCE_API_URL,
      BOUNCE_GOOGLE_ANALYTICS: process.env.BOUNCE_GOOGLE_ANALYTICS
    }
  })
)
