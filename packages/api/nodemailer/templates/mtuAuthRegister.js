const sendMail = require('../../utils/sendMail')

function mtuAuthRegister(user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: 'Welcome to codehustla!',
    html: `
      <p>Hi ${user.username},</p>
      <p>welcome to codehustla.</p>
      <p>Thanks,<br>your codehustla Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthRegister
