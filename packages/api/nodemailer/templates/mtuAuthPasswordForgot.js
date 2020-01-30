const sendMail = require('../../utils/sendMail')

function mtuAuthPasswordForgot(user, token) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: '[bounce] Reset password!',
    html: `
      <p>Hi ${user.username},</p>
      <p>Please click the link to reset your password.</p>
      <p><a href="${process.env.ROOT_URL}/reset-password/${token}">${process.env.ROOT_URL}/reset-password/${token}</a></p>
      <p>Thanks,<br>your bounce Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthPasswordForgot
