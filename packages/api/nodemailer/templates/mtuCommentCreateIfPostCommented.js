const sendMail = require('../../utils/sendMail')

function mtuCommentCreateIfPostCommented(post, user) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: '[noize.dev] News in the forum!',
    html: `
      <p>Hi ${user.username},</p>
      <p>There are new activities on a post where you left a comment. Have a look again.</p>
      <p><a href="${process.env.CLIENT_URL}/post/${post.shortId}/${post.urlSlug}">${process.env.CLIENT_URL}/post/${post.shortId}/${post.urlSlug}<a/></p>
      <p>Thanks,<br>your noize Team.</p>
      <p><a href="${process.env.CLIENT_URL}/dashboard/settings">You don't want to receive any more emails or change your email settings?</a></p>
    `
  }

  sendMail(mailOptions)
}

module.exports = mtuCommentCreateIfPostCommented
