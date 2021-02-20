const dotenv = require('dotenv')
const withImages = require('next-images')

dotenv.config()

module.exports = withImages({
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com']
  }
})
