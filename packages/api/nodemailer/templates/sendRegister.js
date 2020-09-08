async function sendRegister(transporter, user, isActiveToken) {
  try {
    const response = await transporter.sendMail({
      from: 'NOIZE <noreply@noize.dev>',
      to: user.email,
      subject: 'Welcome to noize!',
      html: `
        <p>Hi ${user.username},</p>
        <p>welcome to noize. Please click the link to activate your account.</p>
        <p><a href="${process.env.CLIENT_URL}/activate-account/${isActiveToken}">${process.env.CLIENT_URL}/activate-account/${isActiveToken}</a></p>
        <p>Thanks,<br>your noize Team.</p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendRegister
