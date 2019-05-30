const express = require('express')
const router = express.Router()
const passport = require('passport')
var fs = require('fs')

const User = require('../models/User')

router.get('/getmails', (req, res) => {
  User.find().then(users => {
    res.json(
      users.map(user => {
        return user.username
      })
    )
  })
})

module.exports = router
