const transporter = require('../transporter')

module.exports = mtuPostUpdatedIfBookmarked = (post, bookmark) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: bookmark.user.email,
    subject: '[codehustla] Neuigkeiten im Forum!',
    html: `
        <p>Hi ${bookmark.user.username},</p>
        <p>Soeben wurde ein Beitrag editiert, welchen du als Lesezeichen gespeichert hast. Falls du keine Benachrichtigungen mehr erhalten möchtest, entferne dein Lesezeichen.</p>
        <a href="${process.env.ENV_URL}/post/${post.shortId}/${post.urlSlug}"><button>Beitrag anschauen</button><a/>
        <p><a href="${process.env.ENV_URL}/post/${post.shortId}/${post.urlSlug}">${process.env.ENV_URL}/post/${post.shortId}/${post.urlSlug}<a/></p>
        <p>Vielen Dank,<br> dein codehustla Team.</p>
        `
  }
  transporter.sendMail(mailOptions, err => {
    console.log('Message sent!')
  })
}
