const sendMail = require('../../utils/sendMail')

function mtuAuthVerification(user, token) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: 'Willkommen zu codehustla!',
    html: `
      <p>Hi ${user.username},</p>
      <p>Bitte klicke auf den Link, um deinen Account zu bestätigen.</p>
      <p><a href="${process.env.CODEHUSTLA_API_URL}/verify/${token}">${process.env.CODEHUSTLA_API_URL}/verify/${token}</a></p>
      <p>Vielen Dank,<br>dein codehustla Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthVerification
