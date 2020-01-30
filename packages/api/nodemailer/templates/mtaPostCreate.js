const sendMail = require('../../utils/sendMail')

function mtaPostCreate(post) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: 'mail@bounce.dev',
    subject: 'New Post!',
    html: `
      <p>Hi Admin,</p>
      <p>there is a new post.</p>
      <p><a href="${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}">${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}</a></p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtaPostCreate
