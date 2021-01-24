async function sendPasswordChange(transporter, user, token) {
  try {
    const response = await transporter.sendMail({
      from: 'NOIZE <noreply@noize.dev>',
      to: user.email,
      subject: '[noize.dev] Reset password!',
      html: `
        <p>Hello ${user.name},</p>
        <p>Please click the link to reset your password.</p>
        <p><a href="${process.env.CLIENT_URL}/password-reset/${token}">${process.env.CLIENT_URL}/password-reset/${token}</a></p>
        <p>Thanks!<br>Your Brand-Team</p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendPasswordChange
