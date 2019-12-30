const sendMail = require('../../utils/sendMail')

function mtaPostCreate(post) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: 'mail@codehustla.dev',
    subject: 'Neuer Beitrag!',
    html: `
      <p>Hi Admin,</p>
      <p>Es gibt einen neuen Beitrag.</p>
      <p><a href="${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}">${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}</a></p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtaPostCreate
