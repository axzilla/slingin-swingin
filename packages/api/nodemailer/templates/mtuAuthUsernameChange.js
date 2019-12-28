const sendMail = require('../../utils/sendMail')

function mtuAuthUsernameChange(user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: [user.email],
    subject: '[codehustla] Benutzername geändert!',
    html: `
      <p>Hi ${user.username},</p>
      <p>du hast deinen Benutzernamen erfolgreich geändert.</p>
      <p>Vielen Dank,<br>dein codehustla Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthUsernameChange
