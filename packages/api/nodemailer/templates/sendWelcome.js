async function sendConfirmation(transporter, user) {
  try {
    const response = await transporter.sendMail({
      from: 'Sevier Dirt Slingin and Swingin',
      to: user.email,
      subject: 'Welcome to Sevier Dirt Slingin and Swingin',
      html: `
        <p>Hello ${user.name},</p>
        <p>you are now part of a community that brings travelers all over the world in contact with other travelers. Discover new places, make new friends or share your questions or articles.</p>
        <p>Thanks!<br>Your Sevier Dirt Slingin and Swingin-Team</p>
      `
    })

    console.log({ ...response, email: user.email }) // eslint-disable-line no-console
  } catch (error) {
    if (error) console.log(error) // eslint-disable-line no-console
  }
}

module.exports = sendConfirmation
