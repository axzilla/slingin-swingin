const sendMail = require('../../utils/sendMail')

function mtuAuthPasswordForgot(user, token) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: '[codehustla] Passwort zurücksetzen!',
    html: `
      <p>Hi ${user.username},</p>
      <p>Bitte klicke auf den Link, um dein Passwort zurückzusetzen.</p>
      <p><a href="${process.env.ROOT_URL}/reset-password/${token}">${process.env.ROOT_URL}/reset-password/${token}</a></p>
      <p>Vielen Dank,<br>dein codehustla Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthPasswordForgot
