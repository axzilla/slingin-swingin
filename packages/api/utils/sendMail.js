const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
})

function sendMail(mailOptions) {
  transporter.sendMail(mailOptions, error => {
    error ? console.log(error) : console.log('Message sent!')
  })
}

module.exports = sendMail
