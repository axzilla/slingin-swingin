const sendMail = require('../../utils/sendMail')

function mtuAuthRegister(user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: 'Willkommen zu codehustla!',
    html: `
      <p>Hi ${user.username},</p>
      <p>willkommen zu codehustla.</p>
      <p>Vielen Dank,<br>dein codehustla Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthRegister
