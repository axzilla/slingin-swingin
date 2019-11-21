const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const passport = require('passport')
var fs = require('fs')

const hashPassword = require('../utils/hashPassword')
const isEmpty = require('../utils/isEmpty')
const createJwtToken = require('../utils/createJwtToken')
const domains = require('disposable-email-domains')

const path = require('path')
const multer = require('multer')
const cloudinary = require('cloudinary')

passport.authenticate('jwt', { session: false })

const slugify = require('../helpers/slugify')

const sessionTime = 604800

const storage = multer.diskStorage({
  destination: './public/uploads/avatar',
  filename: function(req, file, cb) {
    cb(null, 'avatar-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '10MB' }
})

let transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const validateRegister = require('../validation/validateRegister')
const validateLogin = require('../validation/validateLogin')
const validatePasswordForgot = require('../validation/validatePasswordForgot')
const validatePasswordReset = require('../validation/validatePasswordReset')
const validatePasswordChange = require('../validation/validatePasswordChange')
const validateEmailChange = require('../validation/validateEmailChange')
const validateUsernameChange = require('../validation/validateUsernameChange')

const User = require('../models/User')
const Profile = require('../models/Profile')

// @route   GET api/users/allusers
// @desc    Get all Users
// @access  Public
router.get('/allusers', async (req, res) => {
  try {
    const foundUsers = await User.find()
    res.json(foundUsers)
  } catch (error) {
    if (error) throw error
  }
})

// @route   POST api/users/avatarUpload
// @desc    Upload/Change Avatar
// @access  Private
router.post(
  '/avatarUpload',
  passport.authenticate('jwt', { session: false }),
  upload.single('avatar'),
  async (req, res) => {
    try {
      console.log('1/3 - User avatar on server successful uploaded!')
      const uploadedFile = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: process.env.CLOUDINARY_PATH_USER_AVATAR,
        public_id: req.file.filename
      })

      console.log('2/3 - User avatar on cloudinary successful uploaded!')
      const foundUser = await User.findById(req.user._id)

      foundUser.avatar = uploadedFile
      const savedUser = await foundUser.save()

      fs.unlink(`${req.file.path}`, error => {
        error ? console.log(error) : console.log('3/3 - User avatar on server successful deleted!')
      })

      if (req.user.avatar && !isEmpty(req.user.avatar)) {
        await cloudinary.v2.uploader.destroy(req.user.avatar.public_id)
        console.log('Old avatar on cloudinary successful deleted')
      }

      const payload = {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
        avatar: savedUser.avatar,
        isVerified: savedUser.isVerified,
        notifications: savedUser.notifications,
        roles: savedUser.roles
      }

      jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 43200 }, (err, token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token
        })
      })
    } catch (error) {
      if (error) throw error
    }
  }
)

// @route   GET api/users/avatar-delete
// @desc    Delete Avatar
// @access  Private
router.post('/avatarDelete', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const foundUser = await User.findById(req.user._id)

    foundUser.avatar = {}
    const savedUser = await foundUser.save()

    await cloudinary.v2.uploader.destroy(req.user.avatar.public_id)
    console.log('Old avatar on cloudinary successful deleted')

    const payload = {
      id: savedUser.id,
      email: savedUser.email,
      username: savedUser.username,
      avatar: savedUser.avatar,
      isVerified: savedUser.isVerified,
      notifications: savedUser.notifications,
      roles: savedUser.roles
    }

    jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
      res.json({
        success: true,
        token: 'Bearer ' + token
      })
    })
  } catch (error) {
    if (error) throw error
  }
})

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { errors, isValid } = validateRegister(req.body)

    const foundEmail = await User.findOne({ email: req.body.email })
    const foundUsername = await User.findOne({ username: req.body.username })

    if (foundEmail) {
      errors.email = 'Es gibt bereits einen Benutzer mit dieser E-Mail Adresse'
      return res.status(400).json(errors)
    }

    if (foundUsername) {
      errors.username = 'Dieser Benutzername ist bereits vergeben'
      return res.status(400).json(errors)
    }

    if (!isValid) {
      return res.status(400).json(errors)
    }

    if (domains.includes(req.body.email.split('@')[1])) {
      errors.email = 'Diese E-Mail Adresse ist nicht erlaubt'
      return res.status(400).json(errors)
    }

    const newUser = await User.create({
      username: slugify(req.body.username),
      email: req.body.email,
      password: await hashPassword(req.body.password),
      conditionsAccepted: req.body.conditionsAccepted
    })

    const payload = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      avatar: newUser.avatar,
      isVerified: newUser.isVerified,
      notifications: newUser.notifications,
      roles: newUser.roles
    }

    const createdJwtToken = await createJwtToken(payload)

    // Send info to User
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: newUser.email,
      subject: 'Willkommen zu codehustla!',
      html: `
      <p>Hi ${newUser.username},</p>
      <p>willkommen zu codehustla.</p>
      <p>Vielen Dank,<br>dein codehustla Team.</p>
      `
    }

    transporter.sendMail(mailOptions, err => {
      err ? console.log(err) : console.log('Message sent!')
    })

    // Send info to Admin
    const adminMailOptions = {
      from: process.env.NODEMAILER_USER,
      to: 'mail@badazz.dev',
      subject: 'Neuer Benutzer!',
      html: `
      <p>Hi Admin,</p>
      <p>es gibt einen neuen Benutzer.</p>
      <p><a href="${process.env.ROOT_URL}/${newUser.username}">${process.env.ROOT_URL}/${newUser.username}</a></p>
      `
    }

    transporter.sendMail(adminMailOptions, err => {
      err ? console.log(err) : console.log('Message sent!')
    })

    new Profile({ user: newUser.id, handle: newUser.username }).save()

    res.json({
      success: true,
      token: createdJwtToken
    })
  } catch (error) {
    if (error) throw error
  }
})

// @route   Post api/users/verify
// @desc    Verify User / Returning JWT Token
// @access  Public
router.post('/verify', async (req, res) => {
  try {
    const errors = {}

    const foundUser = await User.findOne({ _id: req.body.id })

    if (!foundUser) {
      errors.user = 'Benutzer nicht gefunden'
      return res.status(404).json(errors)
    }

    if (foundUser && !foundUser.isVerified) {
      // Check for expired token
      const currentTime = Date.now() / 1000
      if (req.body.exp < currentTime) {
        errors.tokenExpired = 'Verifizierungstoken ist abgelaufen'
        return res.status(404).json(errors)
      } else {
        foundUser.isVerified = true
        foundUser.save()

        const payload = {
          id: foundUser.id,
          email: foundUser.email,
          username: foundUser.username,
          avatar: foundUser.avatar,
          isVerified: foundUser.isVerified,
          notifications: foundUser.notifications,
          roles: foundUser.roles
        } // Create JWT Payload

        // Sign Token
        jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          })
        })
      }
    } else {
      errors.alreadyVerified = 'Benutzer ist bereits verifiziert'
      return res.status(404).json(errors)
    }
  } catch (error) {
    if (error) throw error
  }
})

// @route   Post api/users/verify/send-email
// @desc    Send verification E-Mail
// @access  Public
router.post('/verify/send-email', async (req, res) => {
  try {
    const errors = {}

    const foundUser = await User.findOne({ _id: req.body.id })

    if (!foundUser) {
      errors.foundUser = 'Benutzer nicht gefunden'
      return res.status(404).json(errors)
    }
    if (foundUser && !foundUser.isVerified) {
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        avatar: foundUser.avatar,
        isVerified: foundUser.isVerified,
        notifications: foundUser.notifications,
        roles: foundUser.roles
      } // Create JWT Payload

      // Sign Token
      jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
        const mailOptions = {
          from: process.env.NODEMAILER_USER,
          to: foundUser.email,
          subject: 'Willkommen zu codehustla!',
          html: `
              <p>Hi ${foundUser.username},</p>
              <p>Bitte klicke auf den Link oder auf den button, um deinen Account zu bestätigen.</p>
              <p><a href="${process.env.ROOT_URL}/verify/${token}">${process.env.ROOT_URL}/verify/${token}</a></p>
              <p>Vielen Dank,<br>dein codehustla Team.</p>
              `
        }

        transporter.sendMail(mailOptions, err => {
          err ? console.log(err) : console.log('Message sent!')
          res.json('E-Mail erfolgreich versendet')
        })
      })
    } else {
      errors.alreadyVerified = 'Benutzer ist bereits verifiziert'
      return res.status(404).json(errors)
    }
  } catch (error) {
    if (error) throw error
  }
})

// Login User
router.post('/login', async (req, res) => {
  try {
    const { errors, isValid } = validateLogin(req.body)

    const email = req.body.login
    const username = req.body.login
    const password = req.body.password

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const foundUser = await User.findOne({ $or: [{ email }, { username }] })

    if (!foundUser) {
      errors.email = 'Benutzer nicht gefunden'
      return res.status(400).json(errors)
    }

    const isPasswordMatched = await bcrypt.compare(password, foundUser.password)

    if (isPasswordMatched) {
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        avatar: foundUser.avatar,
        isVerified: foundUser.isVerified,
        notifications: foundUser.notifications,
        roles: foundUser.roles
      }

      const createdJwtToken = await createJwtToken(payload)
      res.json(createdJwtToken)
    } else {
      errors.password = 'Falsches Password'
      return res.status(400).json(errors)
    }
  } catch (err) {
    if (err) throw err
  }
})

// @route   Post api/users/forgot-password
// @desc    Send forgot password E-Mail
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { errors, isValid } = validatePasswordForgot(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const email = req.body.email

    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      errors.email = 'Benutzer nicht gefunden'
      return res.status(404).json(errors)
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      avatar: foundUser.avatar,
      isVerified: foundUser.isVerified,
      notifications: foundUser.notifications,
      roles: foundUser.roles
    } // Create JWT Payload

    jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
      const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: foundUser.email,
        subject: '[codehustla] Passwort zurücksetzen!',
        html: `
                <p>Hi ${foundUser.username},</p>
                <p>Bitte klicke auf den Link oder auf den button, um dein Passwort zurückzusetzen.</p>
                <p><a href="${process.env.ROOT_URL}/reset-password/${token}">${process.env.ROOT_URL}/reset-password/${token}</a></p>
                <p>Vielen Dank,<br>dein codehustla Team.</p>
                `
      }

      transporter.sendMail(mailOptions, err => {
        err ? console.log(err) : console.log('Message sent!')
      })
      res.json({ alert: 'E-Mail erfolgreich versendet' })
    })
  } catch (error) {
    if (error) throw error
  }
})

// @route   POST api/users/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { errors, isValid } = validatePasswordReset(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const foundUser = await User.findById(req.body.id)

    if (!foundUser) {
      res.json('Keinen Benutzer gefunden')
    } else {
      foundUser.password = req.body.password

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(foundUser.password, salt, async (err, hash) => {
          try {
            if (err) throw err
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
            } // Create JWT Payload

            jwt.sign(
              payload,
              process.env.SECRET_OR_KEY,
              { expiresIn: sessionTime },
              (err, token) => {
                const mailOptions = {
                  from: process.env.NODEMAILER_USER,
                  to: savedUser.email,
                  subject: '[codehustla] Passwort zurückgesetzt!',
                  html: `
                        <p>Hi ${savedUser.username},</p>
                        <p>Du hast dein Passwort erfolgreich geändert.</p>
                        <p>Vielen Dank,<br>dein codehustla Team.</p>
                        `
                }

                transporter.sendMail(mailOptions, err => {
                  err ? console.log(err) : console.log('Message sent!')
                })

                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            )
          } catch (error) {
            if (error) throw error
          }
        })
      })
    }
  } catch (error) {
    if (error) throw error
  }
})

// @route   POST api/users/change-username
// @desc    Change username
// @access  Private
router.post('/change-username', async (req, res) => {
  try {
    const { errors, isValid } = validateUsernameChange(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const foundUserByUsername = await User.findOne({ username: req.body.username })

    if (foundUserByUsername) {
      errors.username = 'Benutzername ist bereits vergeben'
      res.status(404).json(errors)
      return
    }

    const foundUserById = await User.findById(req.body.id)

    foundUserById.username = slugify(req.body.username)

    const savedUser = await foundUserById.save()

    // After changing username also change profile handle
    const foundProfile = await Profile.findOne({ user: savedUser.id })

    foundProfile.handle = savedUser.username
    foundProfile.save()

    const payload = {
      id: savedUser.id,
      email: savedUser.email,
      username: savedUser.username,
      avatar: savedUser.avatar,
      isVerified: savedUser.isVerified,
      notifications: savedUser.notifications,
      roles: savedUser.roles
    } // Create JWT Payload

    jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
      const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: [savedUser.email],
        subject: '[codehustla] Benutzername geändert!',
        html: `
                <p>Hi ${savedUser.username},</p>
                <p>Du hast deinen Benutzernamen erfolgreich geändert.</p>
                <p>Vielen Dank,<br>dein codehustla Team.</p>
                `
      }

      transporter.sendMail(mailOptions, err => {
        err ? console.log(err) : console.log('Message sent!')
      })

      res.json({
        alert: 'Benutzername erfolgreich geändert',
        success: true,
        token: 'Bearer ' + token
      })
    })
  } catch (error) {
    if (error) throw error
  }
})

// @route   POST api/users/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', async (req, res) => {
  try {
    const { errors, isValid } = validatePasswordChange(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    const foundUser = await User.findById(req.body.id)

    if (!foundUser) {
      res.json('Keinen Benutzer gefunden')
    } else {
      const isMatch = await bcrypt.compare(oldPassword, foundUser.password)

      if (isMatch) {
        // eslint-disable-next-line
        foundUser.password = newPassword

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(foundUser.password, salt, async (err, hash) => {
            try {
              if (err) throw err
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

              jwt.sign(
                payload,
                process.env.SECRET_OR_KEY,
                { expiresIn: sessionTime },
                (err, token) => {
                  const mailOptions = {
                    from: process.env.NODEMAILER_USER,
                    to: savedUser.email,
                    subject: '[codehustla] Passwort geändert!',
                    html: `
                          <p>Hi ${savedUser.username},</p>
                          <p>Du hast dein Passwort erfolgreich geändert.</p>
                          <p>Vielen Dank,<br>dein codehustla Team.</p>
                          `
                  }

                  transporter.sendMail(mailOptions, err => {
                    err ? console.log(err) : console.log('Message sent!')
                  })

                  res.json({
                    alert: 'Passwort erfolgreich geändert',
                    success: true,
                    token: 'Bearer ' + token
                  })
                }
              )
            } catch (error) {
              if (error) throw error
            }
          })
        })
      } else {
        errors.oldPassword = 'Falsches Password'
        return res.status(400).json(errors)
      }
    }
  } catch (error) {
    if (error) throw error
  }
})

// @route   POST api/users/change-email
// @desc    Change email
// @access  Private
router.post('/change-email', async (req, res) => {
  try {
    const { errors, isValid } = validateEmailChange(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    if (domains.includes(req.body.email.split('@')[1])) {
      errors.email = 'Diese E-Mail Adresse ist nicht erlaubt'
      return res.status(400).json(errors)
    }

    const foundUserByEmail = await User.findOne({ email: req.body.email })

    if (foundUserByEmail) {
      errors.email = 'E-Mail Adresse ist bereits vergeben'
      return res.status(400).json(errors)
    }

    const foundUserById = await User.findById(req.body.id)

    const newEmail = req.body.email
    const oldEmail = foundUserById.email
    foundUserById.email = newEmail

    const savedUser = await foundUserById.save()

    const payload = {
      id: savedUser.id,
      email: savedUser.email,
      username: savedUser.username,
      avatar: savedUser.avatar,
      isVerified: savedUser.isVerified,
      notifications: savedUser.notifications,
      roles: savedUser.roles
    }

    jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
      const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: [savedUser.email, oldEmail],
        subject: '[codehustla] E-Mail Adresse geändert!',
        html: `
              <p>Hi ${savedUser.username},</p>
              <p>Du hast deine E-Mail Adresse erfolgreich geändert.</p>
              <p>Vielen Dank,<br>dein codehustla Team.</p>
              `
      }

      transporter.sendMail(mailOptions, err => {
        err ? console.log(err) : console.log('Message sent!')
      })

      res.json({
        alert: 'E-Mail erfolgreich geändert',
        success: true,
        token: 'Bearer ' + token
      })
    })
  } catch (error) {
    if (error) throw error
  }
})

router.post(
  '/change-settings',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const notifications = req.body

      const foundUser = await User.findById(req.user._id)

      foundUser.notifications = notifications
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

      jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
        res.json({
          alert: 'E-Mail erfolgreich geändert',
          success: true,
          token: 'Bearer ' + token
        })
      })
    } catch (error) {
      if (error) throw error
    }
  }
)

module.exports = router
