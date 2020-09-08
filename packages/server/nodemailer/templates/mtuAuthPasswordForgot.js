const sendMail = require('../../utils/sendMail')

function mtuAuthPasswordForgot(user, token) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: '[noize.dev] Reset password!',
    html: `
      <p>Hi ${user.username},</p>
      <p>Someone has requested a link to change your password.</p>
      <p><a href="${process.env.CLIENT_URL}/reset-password/${token}">${process.env.CLIENT_URL}/reset-password/${token}</a></p>
      <p>Your password will not change unless you use the link above and set a new one.</p>
      <p>If you don't want to change your password, you can simply ignore this email.</p>
      <p>Thanks,<br>your noize Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthPasswordForgot
