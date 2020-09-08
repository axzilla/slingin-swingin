async function sendUsernameChange(transporter, user) {
  try {
    const response = await transporter.sendMail({
      from: 'NOIZE <noreply@noize.dev>',
      to: user.email,
      subject: '[noize.dev] Username changed!',
      html: `
        <p>Hi ${user.username},</p>
        <p>you have successfully changed your username.</p>
        <p>Thanks,<br>your noize Team.</p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendUsernameChange
