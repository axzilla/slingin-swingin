const sendMail = require('../../utils/sendMail')

function mtuAuthPasswordReset(user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: '[codehustla] Passwort reset!',
    html: `
      <p>Hi ${user.username},</p>
      <p>You have successfully changed your password.</p>
      <p>Thanks,<br>your codehustla Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthPasswordReset
