async function sendPostCreate(transporter, post, user) {
  try {
    const response = await transporter.sendMail({
      from: 'digitalnomads.dev <noreply@digitalnomads.dev>',
      to: user.email,
      subject: 'News in the forum',
      html: `
        <p>Hello ${user.name},</p>
        <p>A new post has just been created. Have a look again.</p>
        <p><a href="${process.env.CLIENT_URL}/post/${post.shortId}/${post.urlSlug}">${process.env.CLIENT_URL}/post/${post.shortId}/${post.urlSlug}<a/></p>
        <p>Thanks!<br>digitalnomads.dev digitalnomads.dev-Team</p>
        <p><a href="${process.env.CLIENT_URL}/account-settings">You don't want to receive any more emails or change your email settings?</a></p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendPostCreate
