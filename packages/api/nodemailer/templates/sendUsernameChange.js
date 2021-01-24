async function sendUsernameChange(transporter, user) {
  try {
    const response = await transporter.sendMail({
      from: 'NOIZE <noreply@noize.dev>',
      to: user.email,
      subject: '[noize.dev] Username changed!',
      html: `
        <p>Hello ${user.name},</p>
        <p>you have successfully changed your username.</p>
        <p>Thanks!<br>Your Brand-Team</p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendUsernameChange
