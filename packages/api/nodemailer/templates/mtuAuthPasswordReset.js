const sendMail = require('../../utils/sendMail')

function mtuAuthPasswordReset(user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: '[codehustla] Passwort zurückgesetzt!',
    html: `
      <p>Hi ${user.username},</p>
      <p>Du hast dein Passwort erfolgreich geändert.</p>
      <p>Vielen Dank,<br>dein codehustla Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthPasswordReset
