const sendMail = require('../../utils/sendMail')

function mtuCommentCreateIfPostOwner(post, user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: '[bounce] News in the forum!',
    html: `
      <p>Hi ${user.username},</p>
      <p>There are new activities on your post. Have a look again.</p>
      <p><a href="${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}">${process.env.ROOT_URL}/post/${post.shortId}/${post.urlSlug}<a/></p>
      <p>Thanks,<br>your bounce Team.</p>
      <p><a href="${process.env.ROOT_URL}/edit-settings">You don't want to receive any more emails or change your email settings?</a></p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuCommentCreateIfPostOwner
