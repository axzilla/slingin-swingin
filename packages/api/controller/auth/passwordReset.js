const bcrypt = require('bcryptjs')
const createJwtToken = require('../../utils/createJwtToken')
const User = require('../../models/User')
const mtuAuthPasswordReset = require('../../nodemailer/templates/mtuAuthPasswordReset')
const validatePasswordReset = require('../../validation/validatePasswordReset')
const isEmpty = require('../../utils/isEmpty')

async function passwordReset(req, res) {
  try {
    const { errors } = validatePasswordReset(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const foundUser = await User.findById(req.body.id)

    if (!foundUser) {
      res.json('No user found')
    } else {
      foundUser.password = req.body.password

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(foundUser.password, salt, async (error, hash) => {
          try {
            if (error) throw error
            foundUser.password = hash
            const savedUser = await foundUser.save()

            const payload = {
              id: savedUser.id,
              email: savedUser.email,
              username: savedUser.username,
              avatar: savedUser.avatar,
              isVerified: savedUser.isVerified,
              notifications: savedUser.notifications,
              roles: savedUser.roles
            }

            mtuAuthPasswordReset(savedUser)
            const token = await createJwtToken(payload)
            res.json({ success: true, token })
          } catch (error) {
            if (error) throw error
          }
        })
      })
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = passwordReset
