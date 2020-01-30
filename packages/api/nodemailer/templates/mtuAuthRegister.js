const sendMail = require('../../utils/sendMail')

function mtuAuthRegister(user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: 'Welcome to bounce!',
    html: `
      <p>Hi ${user.username},</p>
      <p>welcome to bounce.</p>
      <p>Thanks,<br>your bounce Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthRegister
