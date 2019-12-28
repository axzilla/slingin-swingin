const sendMail = require('../../utils/sendMail')

function mtuAuthEmailChange(user, oldEmail) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: [user.email, oldEmail],
    subject: '[codehustla] E-Mail Adresse geändert!',
    html: `
      <p>Hi ${user.username},</p>
      <p>du hast deine E-Mail Adresse erfolgreich geändert.</p>
      <p>Vielen Dank,<br>dein codehustla Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthEmailChange
