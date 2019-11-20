const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const passport = require('passport')
const isEmpty = require('../validation/is-empty')
var fs = require('fs')

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

const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const validateForgotPasswordInput = require('../validation/forgot-password')
const validateResetPasswordInput = require('../validation/reset-password')
const validateChangePasswordInput = require('../validation/change-password')
const validateChangeEmailInput = require('../validation/change-email')
const validateChangeUsernameInput = require('../validation/change-username')

const User = require('../models/User')
const Profile = require('../models/Profile')

// // @route   GET api/users/emails
// // @desc    Get all Users E-Mails for Mailchimp
// // @access  Public
// router.get('/emails', (req, res) => {
//   User.find().then(users => {
//     userMails = users.map(user => user.email)
//     res.json(userMails)
//   })
// })

// @route   GET api/users/allusers
// @desc    Get all Users
// @access  Public
router.get('/allusers', (req, res) => {
  User.find().then(users => res.json(users))
})

// @route   POST api/users/avatarUpload
// @desc    Upload/Change Avatar
// @access  Private
router.post(
  '/avatarUpload',
  passport.authenticate('jwt', { session: false }),
  upload.single('avatar'),
  (req, res) => {
    console.log('1/3 - User avatar on server successful uploaded!')
    cloudinary.v2.uploader
      .upload(req.file.path, {
        folder: process.env.CLOUDINARY_PATH_USER_AVATAR,
        public_id: req.file.filename
      })
      .then((result, err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('2/3 - User avatar on cloudinary successful uploaded!')
          User.findById(req.user._id).then(user => {
            user.avatar = result
            user.save()

            fs.unlink(`${req.file.path}`, error => {
              error
                ? console.log(error)
                : console.log('3/3 - User avatar on server successful deleted!')
            })

            if (req.user.avatar && !isEmpty(req.user.avatar)) {
              cloudinary.v2.uploader.destroy(req.user.avatar.public_id).then((result, error) => {
                console.log('Old avatar on cloudinary successful deleted')
              })
            }

            const payload = {
              id: user.id,
              email: user.email,
              username: user.username,
              avatar: user.avatar,
              isVerified: user.isVerified,
              notifications: user.notifications,
              roles: user.roles
            }

            jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 43200 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            })
          })
        }
      })
  }
)

// @route   GET api/users/avatar-delete
// @desc    Delete Avatar
// @access  Private
router.post('/avatarDelete', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findById(req.user._id).then(user => {
    user.avatar = {}
    user.save()

    cloudinary.v2.uploader.destroy(req.user.avatar.public_id).then((result, error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Old avatar on cloudinary successful deleted')
      }
    })

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      isVerified: user.isVerified,
      notifications: user.notifications,
      roles: user.roles
    } // Create JWT Payload

    jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
      res.json({
        success: true,
        token: 'Bearer ' + token
      })
    })
  })
})

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  if (domains.includes(req.body.email.split('@')[1])) {
    errors.email = 'Diese E-Mail Adresse ist nicht erlaubt'
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Es gibt bereits einen Benutzer mit dieser E-Mail Adresse'
      return res.status(400).json(errors)
    } else {
      User.findOne({ username: req.body.username }).then(user => {
        if (user) {
          errors.username = 'Dieser Benutzername ist bereits vergeben'
          return res.status(400).json(errors)
        } else {
          const newUser = new User({
            username: slugify(req.body.username),
            email: req.body.email,
            password: req.body.password,
            conditionsAccepted: req.body.conditionsAccepted
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash
              newUser
                .save()
                .then(user => {
                  const payload = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar,
                    isVerified: user.isVerified,
                    notifications: user.notifications,
                    roles: user.roles
                  } // Create JWT Payload

                  // Sign Token
                  jwt.sign(
                    payload,
                    process.env.SECRET_OR_KEY,
                    { expiresIn: sessionTime },
                    (err, token) => {
                      // Send info to User
                      const mailOptions = {
                        from: process.env.NODEMAILER_USER,
                        to: newUser.email,
                        subject: 'Willkommen zu codehustla!',
                        html: `
                        <p>Hi ${user.username},</p>
                        <p>Bitte klicke auf den Link oder auf den button, um deinen Account zu bestätigen.</p>
                        <a href="${process.env.ROOT_URL}/verify/${token}"><button>Account bestätigen</button></a>
                        <p><a href="${process.env.ROOT_URL}/verify/${token}">${process.env.ROOT_URL}/verify/${token}</a></p>
                        <p>Vielen Dank,<br>dein codehustla Team.</p>
                        `
                      }

                      transporter.sendMail(mailOptions, err => {
                        console.log('Message sent!')
                      })

                      // Send info to Admin
                      const adminMailOptions = {
                        from: process.env.NODEMAILER_USER,
                        to: 'mail@badazz.dev',
                        subject: 'Neuer Benutzer!',
                        html: `
                        <p>Hi Admin,</p>
                        <p>Es gibt einen neuen Benutzer.</p>
                        <a href="${process.env.ROOT_URL}/${user.username}"><button>Profil anschauen</button></a>
                        <p><a href="${process.env.ROOT_URL}/${user.username}">${process.env.ROOT_URL}/${user.username}</a></p>
                        `
                      }

                      transporter.sendMail(adminMailOptions, err => {
                        console.log('Message sent!')
                      })

                      Profile.findOne({ handle: user.username }).then(profile => {
                        if (profile) {
                          console.log('isProfile')
                        } else {
                          const profileFields = {}
                          profileFields.name = req.body.name
                          profileFields.user = user.id
                          profileFields.handle = user.username
                          new Profile(profileFields).save()
                        }
                      })

                      res.json({
                        success: true,
                        token: 'Bearer ' + token
                      })
                    }
                  )
                })
                .catch(err => console.log(err))
            })
          })
        }
      })
    }
  })
})

// @route   Post api/users/verify
// @desc    Verify User / Returning JWT Token
// @access  Public
router.post('/verify', (req, res) => {
  const errors = {}

  User.findOne({ _id: req.body.id }).then(user => {
    if (!user) {
      errors.user = 'Benutzer nicht gefunden'
      return res.status(404).json(errors)
    }

    if (user && !user.isVerified) {
      // Check for expired token
      const currentTime = Date.now() / 1000
      if (req.body.exp < currentTime) {
        errors.tokenExpired = 'Verifizierungstoken ist abgelaufen'
        return res.status(404).json(errors)
      } else {
        user.isVerified = true
        user.save()

        const payload = {
          id: user.id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          isVerified: user.isVerified,
          notifications: user.notifications,
          roles: user.roles
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
  })
})

// @route   Post api/users/verify/send-email
// @desc    Send verification E-Mail
// @access  Public
router.post('/verify/send-email', (req, res) => {
  const errors = {}

  User.findOne({ _id: req.body.id }).then(user => {
    if (!user) {
      errors.user = 'Benutzer nicht gefunden'
      return res.status(404).json(errors)
    }
    if (user && !user.isVerified) {
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        isVerified: user.isVerified,
        notifications: user.notifications,
        roles: user.roles
      } // Create JWT Payload

      // Sign Token
      jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
        const mailOptions = {
          from: process.env.NODEMAILER_USER,
          to: user.email,
          subject: 'Willkommen zu codehustla!',
          html: `
              <p>Hi ${user.username},</p>
              <p>Bitte klicke auf den Link oder auf den button, um deinen Account zu bestätigen.</p>
              <a href="${process.env.ROOT_URL}/verify/${token}"><button>Account bestätigen</button></a>
              <p><a href="${process.env.ROOT_URL}/verify/${token}">${process.env.ROOT_URL}/verify/${token}</a></p>
              <p>Vielen Dank,<br>dein codehustla Team.</p>
              `
        }

        transporter.sendMail(mailOptions, err => {
          console.log('Message sent!')
          res.json('E-Mail erfolgreich versendet')
        })
      })
    } else {
      errors.alreadyVerified = 'Benutzer ist bereits verifiziert'
      return res.status(404).json(errors)
    }
  })
})

// Login User
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  const email = req.body.login
  const username = req.body.login
  const password = req.body.password

  if (!isValid) {
    return res.status(400).json(errors)
  }

  try {
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
      // jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
      //   res.json({
      //     success: true,
      //     token: 'Bearer ' + token
      //   })
      // })
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
router.post('/forgot-password', (req, res) => {
  const { errors, isValid } = validateForgotPasswordInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'Benutzer nicht gefunden'
      return res.status(404).json(errors)
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      isVerified: user.isVerified,
      notifications: user.notifications,
      roles: user.roles
    } // Create JWT Payload

    jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
      const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: user.email,
        subject: '[codehustla] Passwort zurücksetzen!',
        html: `
                <p>Hi ${user.username},</p>
                <p>Bitte klicke auf den Link oder auf den button, um dein Passwort zurückzusetzen.</p>
                <a href="${process.env.ROOT_URL}/reset-password/${token}"><button>Passwort zurücksetzen</button></a>
                <p><a href="${process.env.ROOT_URL}/reset-password/${token}">${process.env.ROOT_URL}/reset-password/${token}</a></p>
                <p>Vielen Dank,<br>dein codehustla Team.</p>
                `
      }

      transporter.sendMail(mailOptions, err => {
        console.log('Message sent!')
      })
      res.json({ alert: 'E-Mail erfolgreich versendet' })
    })
  })
})

// @route   POST api/users/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', (req, res) => {
  const { errors, isValid } = validateResetPasswordInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findById(req.body.id).then(user => {
    if (!user) {
      res.json('Keinen Benutzer gefunden')
    } else {
      user.password = req.body.password

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err
          user.password = hash
          user
            .save()
            .then(user => {
              const payload = {
                id: user.id,
                email: user.email,
                username: user.username,
                avatar: user.avatar,
                isVerified: user.isVerified,
                notifications: user.notifications,
                roles: user.roles
              } // Create JWT Payload

              jwt.sign(
                payload,
                process.env.SECRET_OR_KEY,
                { expiresIn: sessionTime },
                (err, token) => {
                  const mailOptions = {
                    from: process.env.NODEMAILER_USER,
                    to: user.email,
                    subject: '[codehustla] Passwort zurückgesetzt!',
                    html: `
                      <p>Hi ${user.username},</p>
                      <p>Du hast dein Passwort erfolgreich geändert.</p>
                      <p>Vielen Dank,<br>dein codehustla Team.</p>
                      `
                  }

                  transporter.sendMail(mailOptions, err => {
                    console.log('Message sent!')
                  })

                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  })
                }
              )
            })
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route   POST api/users/change-username
// @desc    Change username
// @access  Private
router.post('/change-username', (req, res) => {
  const { errors, isValid } = validateChangeUsernameInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = 'Benutzername ist bereits vergeben'
      res.status(404).json(errors)
    } else {
      User.findById(req.body.id).then(user => {
        user.username = slugify(req.body.username)
        user.save().then(user => {
          // After changing username also change profile handle
          Profile.findOne({ user: user.id }).then(profile => {
            profile.handle = user.username
            profile.save()
          })

          const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            isVerified: user.isVerified,
            notifications: user.notifications,
            roles: user.roles
          } // Create JWT Payload

          jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
            const mailOptions = {
              from: process.env.NODEMAILER_USER,
              to: [user.email],
              subject: '[codehustla] Benutzername geändert!',
              html: `
              <p>Hi ${user.username},</p>
              <p>Du hast deinen Benutzernamen erfolgreich geändert.</p>
              <p>Vielen Dank,<br>dein codehustla Team.</p>
              `
            }

            transporter.sendMail(mailOptions, err => {
              console.log('message sent!')
            })

            res.json({
              alert: 'Benutzername erfolgreich geändert',
              success: true,
              token: 'Bearer ' + token
            })
          })
        })
      })
    }
  })
})

// @route   POST api/users/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', (req, res) => {
  const { errors, isValid } = validateChangePasswordInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  User.findById(req.body.id).then(user => {
    if (!user) {
      res.json('Keinen Benutzer gefunden')
    } else {
      bcrypt.compare(oldPassword, user.password).then(isMatch => {
        if (isMatch) {
          user.password = newPassword

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err
              user.password = hash
              user
                .save()
                .then(user => {
                  const payload = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar,
                    isVerified: user.isVerified,
                    notifications: user.notifications,
                    roles: user.roles
                  } // Create JWT Payload

                  jwt.sign(
                    payload,
                    process.env.SECRET_OR_KEY,
                    { expiresIn: sessionTime },
                    (err, token) => {
                      const mailOptions = {
                        from: process.env.NODEMAILER_USER,
                        to: user.email,
                        subject: '[codehustla] Passwort geändert!',
                        html: `
                      <p>Hi ${user.username},</p>
                      <p>Du hast dein Passwort erfolgreich geändert.</p>
                      <p>Vielen Dank,<br>dein codehustla Team.</p>
                      `
                      }

                      transporter.sendMail(mailOptions, err => {
                        console.log('message sent!')
                      })

                      res.json({
                        alert: 'Passwort erfolgreich geändert',
                        success: true,
                        token: 'Bearer ' + token
                      })
                    }
                  )
                })
                .catch(err => console.log(err))
            })
          })
        } else {
          errors.oldPassword = 'Falsches Password'
          return res.status(400).json(errors)
        }
      })
    }
  })
})

// @route   POST api/users/change-email
// @desc    Change email
// @access  Private
router.post('/change-email', (req, res) => {
  const { errors, isValid } = validateChangeEmailInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  if (domains.includes(req.body.email.split('@')[1])) {
    errors.email = 'Diese E-Mail Adresse ist nicht erlaubt'
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'E-Mail Adresse ist bereits vergeben'
      return res.status(400).json(errors)
    } else {
      User.findById(req.body.id).then(user => {
        const newEmail = req.body.email
        oldEmail = user.email
        user.email = newEmail

        user.save().then(user => {
          const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            isVerified: user.isVerified,
            notifications: user.notifications,
            roles: user.roles
          } // Create JWT Payload

          jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
            const mailOptions = {
              from: process.env.NODEMAILER_USER,
              to: [user.email, oldEmail],
              subject: '[codehustla] E-Mail Adresse geändert!',
              html: `
              <p>Hi ${user.username},</p>
              <p>Du hast deine E-Mail Adresse erfolgreich geändert.</p>
              <p>Vielen Dank,<br>dein codehustla Team.</p>
              `
            }

            transporter.sendMail(mailOptions, err => {
              console.log('message sent!')
            })

            res.json({
              alert: 'E-Mail erfolgreich geändert',
              success: true,
              token: 'Bearer ' + token
            })
          })
        })
      })
    }
  })
})

router.post('/change-settings', passport.authenticate('jwt', { session: false }), (req, res) => {
  const notifications = req.body

  User.findById(req.user._id).then(user => {
    user.notifications = notifications
    user.save().then(updatedUser => {
      const payload = {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        avatar: updatedUser.avatar,
        isVerified: updatedUser.isVerified,
        notifications: updatedUser.notifications,
        roles: user.roles
      }

      jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: sessionTime }, (err, token) => {
        res.json({
          alert: 'E-Mail erfolgreich geändert',
          success: true,
          token: 'Bearer ' + token
        })
      })
    })
  })
})

module.exports = router
