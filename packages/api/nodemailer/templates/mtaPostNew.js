const transporter = require('../transporter')
const keys = require('../../config/keys')

module.exports = mtaPostNew = (post) => {
  const mailOptions = {
    from: keys.nodemailerUser,
    to: 'office@codehustla.io',
    subject: 'Neuer Beitrag!',
    html: `
      <p>Hi Admin,</p>
      <p>Es gibt einen neuen Beitrag.</p>
      <a href="${process.env.ENV_API}/post/${post.shortId}/${post.urlSlug}"><button>Beitrag anschauen</button></a>
      <p><a href="${process.env.ENV_API}/post/${post.shortId}/${post.urlSlug}">${process.env.ENV_API}/post/${post.shortId}/${post.urlSlug}</a></p>
      `
  }

  transporter.sendMail(mailOptions, err => {
    console.log('Message sent!')
  })
}