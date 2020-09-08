async function sendPasswordForgot(transporter, user, token) {
  try {
    const response = await transporter.sendMail({
      from: 'NOIZE <noreply@noize.dev>',
      to: user.email,
      subject: '[noize.dev] Reset password!',
      html: `
        <p>Hi ${user.username},</p>
        <p>Someone has requested a link to change your password.</p>
        <p><a href="${process.env.CLIENT_URL}/password-reset/${token}">${process.env.CLIENT_URL}/password-reset/${token}</a></p>
        <p>Your password will not change unless you use the link above and set a new one.</p>
        <p>If you don't want to change your password, you can simply ignore this email.</p>
        <p>Thanks,<br>your noize Team.</p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendPasswordForgot
