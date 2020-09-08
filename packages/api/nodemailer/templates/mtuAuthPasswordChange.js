const sendMail = require('../../utils/sendMail')

function mtuAuthPasswordChange(user, token) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: '[noize.dev] Reset password!',
    html: `
      <p>Hi ${user.username},</p>
      <p>Please click the link to reset your password.</p>
      <p><a href="${process.env.CLIENT_URL}/password-reset/${token}">${process.env.CLIENT_URL}/password-reset/${token}</a></p>
      <p>Thanks,<br>your noize Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthPasswordChange
