// Models
const User = require('../../models/User')

async function passwordResetValidation(req, res) {
  try {
    const { resetPasswordToken } = req.params

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpires: { $gt: Date.now() }
    })

    if (!user) {
      res.json({ isResetPasswordTokenValid: false })

      // return res
      //   .status(400)
      //   .json('Your request to reset password has already expired. Please try again.')
    }

    res.json({ isResetPasswordTokenValid: true })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = passwordResetValidation
