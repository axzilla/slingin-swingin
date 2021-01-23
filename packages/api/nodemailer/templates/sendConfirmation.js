async function sendConfirmation(transporter, user, isActiveToken) {
  try {
    const response = await transporter.sendMail({
      from: 'BRAND <noreply@brand.dev>',
      to: user.email,
      subject: 'Please confirm your email address',
      html: `
        <p>Hello ${user.username},</p>
        <p>welcome to brand! Nice that you're here. To get started, you'll first need to confirm your email address. Please click on the following link to complete your registration:</p>
        <p><a href="${process.env.CLIENT_URL}/confirm-email?token=${isActiveToken}">${process.env.CLIENT_URL}/confirm-email?token=${isActiveToken}</a></p>
        <p>Thanks!<br>Your Brand-Team</p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendConfirmation
