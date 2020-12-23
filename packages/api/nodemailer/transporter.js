const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

// ### MAILGUN STUFF ###
// const nodemailer = require('nodemailer')
// const mg = require('nodemailer-mailgun-transport')

// const auth = {
//   auth: {
//     api_key: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMAIN
//   }
// }

// module.exports = nodemailer.createTransport(mg(auth))
