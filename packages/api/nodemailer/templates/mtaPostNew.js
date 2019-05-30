const transporter = require('../transporter')

module.exports = mtaPostNew = post => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: 'office@codehustla.io',
    subject: 'Neuer Beitrag!',
    html: `
      <p>Hi Admin,</p>
      <p>Es gibt einen neuen Beitrag.</p>
      <a href="${process.env.ENV_API}/post/${post.shortId}/${
      post.urlSlug
    }"><button>Beitrag anschauen</button></a>
      <p><a href="${process.env.ENV_API}/post/${post.shortId}/${
      post.urlSlug
    }">${process.env.ENV_API}/post/${post.shortId}/${post.urlSlug}</a></p>
      `
  }

  transporter.sendMail(mailOptions, err => {
    console.log('Message sent!')
  })
}
