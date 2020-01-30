const sendMail = require('../../utils/sendMail')

function mtuAuthPasswordReset(user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: '[bounce] Password reset!',
    html: `
      <p>Hi ${user.username},</p>
      <p>You have successfully changed your password.</p>
      <p>Thanks,<br>your bounce Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthPasswordReset
