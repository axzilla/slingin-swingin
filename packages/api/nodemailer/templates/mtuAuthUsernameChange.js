const sendMail = require('../../utils/sendMail')

function mtuAuthUsernameChange(user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: [user.email],
    subject: '[bounce] Username changed!',
    html: `
      <p>Hi ${user.username},</p>
      <p>you have successfully changed your username.</p>
      <p>Thanks,<br>your bounce Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthUsernameChange
