const sendMail = require('../../utils/sendMail')

function mtuAuthEmailChange(user, oldEmail) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: [user.email, oldEmail],
    subject: '[bounce] Email address changed!',
    html: `
      <p>Hi ${user.username},</p>
      <p>you have successfully changed your email address.</p>
      <p>Thanks,<br>your bounce Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthEmailChange
