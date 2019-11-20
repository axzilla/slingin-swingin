const transporter = require('../transporter')

module.exports = mtaPostNew = post => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: 'mail@badazz.dev',
    subject: 'Neuer Beitrag!',
    html: `
      <p>Hi Admin,</p>
      <p>Es gibt einen neuen Beitrag.</p>
      <a href="${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}"><button>Beitrag anschauen</button></a>
      <p><a href="${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}">${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}</a></p>
      `
  }

  transporter.sendMail(mailOptions, err => {
    console.log('Message sent!')
  })
}
