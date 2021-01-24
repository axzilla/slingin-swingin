async function sendPasswordReset(transporter, user) {
  try {
    const response = await transporter.sendMail({
      from: 'BRAND <noreply@noize.dev>',
      to: user.email,
      subject: 'Password changed',
      html: `
      <p>Hello ${user.name},</p>
      <p>We noticed the password for your BRAND account was recently changed. If you didn't do this, review your account now. If this was you, you can safely disregard this email.</p>
      <p>Thanks!<br>Your Brand-Team</p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendPasswordReset
