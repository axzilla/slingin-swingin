async function sendEmailChange(transporter, user, oldEmail) {
  try {
    const response = await transporter.sendMail({
      from: 'NOIZE <noreply@noize.dev>',
      to: [user.email, oldEmail],
      subject: '[noize.dev] Email address changed!',
      html: `
        <p>Hi ${user.username},</p>
        <p>you have successfully changed your email address.</p>
        <p>Thanks,<br>your noize Team.</p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendEmailChange
