async function sendPasswordForgot(transporter, user, resetPasswordToken) {
  try {
    const response = await transporter.sendMail({
      from: 'digitalnomads.dev <noreply@digitalnomads.dev>',
      to: user.email,
      subject: 'Reset your password',
      html: `
        <p>Hello ${user.name},</p>
        <p>We’ve received a request to reset your password.</p>
        <p>If you didn’t make the request, just ignore this message. Otherwise, you can reset your password.</p>
        <p><a href="${process.env.CLIENT_URL}/password-reset/${resetPasswordToken}">${process.env.CLIENT_URL}/password-reset/${resetPasswordToken}</a></p>
        <p>Thanks!<br>Your digitalnomads.dev-Team</p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendPasswordForgot
