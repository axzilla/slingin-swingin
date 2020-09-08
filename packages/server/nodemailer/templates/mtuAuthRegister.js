const sendMail = require('../../utils/sendMail')

function mtuAuthRegister(user, isActiveToken) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: 'Welcome to noize!',
    html: `
      <p>Hi ${user.username},</p>
      <p>welcome to noize. Please click the link to activate your account.</p>
      <p><a href="${process.env.CLIENT_URL}/activate-account/${isActiveToken}">${process.env.CLIENT_URL}/activate-account/${isActiveToken}</a></p>
      <p>Thanks,<br>your noize Team.</p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuAuthRegister
