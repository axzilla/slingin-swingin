const dotenv = require('dotenv')
const withImages = require('next-images')

dotenv.config()

module.exports = withImages({
  env: {
    ROOT_URL: process.env.ROOT_URL
  }
})
