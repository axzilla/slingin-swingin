require('dotenv').config()

// Packages
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookie = require('cookie')
const jwtDecode = require('jwt-decode')
const cors = require('cors')

// App
const app = express()

// Models
const User = require('./models/User')

// App Settings
app.use(cors())
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb', extended: true }))
app.use(passport.initialize())

// App Routes
app.use('/_admin', require('./routes/_admin'))
app.use('/auth', require('./routes/auth'))
app.use('/profile', require('./routes/profile'))
app.use('/posts', require('./routes/posts'))
app.use('/comments', require('./routes/comments'))
app.use('/search', require('./routes/search'))
app.use('/users', require('./routes/users'))

require('./utils/passport')(passport)

const db = process.env.MONGO_URI
const port = process.env.PORT || 5000

mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('MongoDB Connected') // eslint-disable-line no-console

    const server = app.listen(port, () => console.log(`Server running on port ${port}`)) // eslint-disable-line no-console
    const io = require('socket.io')(server)

    io.on('connection', async socket => {
      const { jwtToken } = cookie.parse(socket.handshake.headers.cookie)

      if (jwtToken) {
        const decodedUser = jwtDecode(jwtToken)
        addClientToMap(decodedUser, socket.id)

        socket.on('disconnect', () => {
          removeClientFromMap(decodedUser, socket.id)
        })
      }

      socket.on('client-sign-in', ({ decodedUser, socketId }) => {
        addClientToMap(decodedUser, socketId)
      })

      socket.on('client-sign-out', ({ decodedUser, socketId }) => {
        removeClientFromMap(decodedUser, socketId)
      })
    })
  })
  .catch(err => console.log(err)) // eslint-disable-line no-console

const userSocketIdMap = new Map() // A map of online usernames and their clients

async function addClientToMap(user, socketId) {
  if (!userSocketIdMap.has(user.username)) {
    // When user is joining first time
    userSocketIdMap.set(user.username, new Set([socketId]))

    await User.findByIdAndUpdate(
      user.id,
      { dateLastSignIn: Date.now(), isOnline: true },
      { new: true }
    )

    console.log(userSocketIdMap) // eslint-disable-line no-console
  } else {
    // User had already joined from one client and now joining using another client
    userSocketIdMap.get(user.username).add(socketId)
    console.log(userSocketIdMap) // eslint-disable-line no-console
  }
}

async function removeClientFromMap(user, socketId) {
  if (userSocketIdMap.has(user.username)) {
    let userSocketIdSet = userSocketIdMap.get(user.username)
    userSocketIdSet.delete(socketId)

    // If there are no clients for a user, remove that user from online list(map)
    if (userSocketIdSet.size == 0) {
      await User.findByIdAndUpdate(
        user.id,
        { dateLastSignOut: Date.now(), isOnline: false },
        { new: true }
      )

      userSocketIdMap.delete(user.username)
      console.log(userSocketIdMap) // eslint-disable-line no-console
    } else {
      console.log(userSocketIdMap) // eslint-disable-line no-console
    }
  }
}
