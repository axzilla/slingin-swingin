const transporter = require('../transporter')

module.exports = post => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: 'mail@badazz.dev',
    subject: 'Neuer Beitrag!',
    html: `
      <p>Hi Admin,</p>
      <p>Es gibt einen neuen Beitrag.</p>
      <p><a href="${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}">${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}</a></p>
      `
  }

  transporter.sendMail(mailOptions, error => {
    error ? console.log(error) : console.log('Message sent!')
  })
}
