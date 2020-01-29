const sendMail = require('../../utils/sendMail')

function mtaAuthRegister(user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: 'mail@codehustla.dev',
    subject: 'New user!',
    html: `
      <p>Hi Admin,</p>
      <p>there is a new user.</p>
      <p><a href="${process.env.ROOT_URL}/${user.username}">${process.env.ROOT_URL}/${user.username}</a></p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtaAuthRegister
