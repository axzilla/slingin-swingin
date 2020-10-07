const io = require('./_socketio')
global.io = io
// Packages
const mongoose = require('mongoose')
const cookie = require('cookie')
const jwtDecode = require('jwt-decode')

// Models
const User = require('./models/User')

const db = process.env.MONGO_URI

const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(db, mongooseOptions, () => console.log('MongoDB Connected')) // eslint-disable-line no-console

global.io.on('connection', async socket => {
  global.socket = socket

  socket.on('join-room', conversationId => {
    console.log(`Socket ${socket.id} joining room-${conversationId}`) // eslint-disable-line no-console
    socket.join(conversationId)
  })

  const decodedUser =
    socket.handshake.headers.cookie && cookie.parse(socket.handshake.headers.cookie).jwtToken
      ? jwtDecode(cookie.parse(socket.handshake.headers.cookie).jwtToken)
      : null

  if (decodedUser) {
    console.log(`${socket.id} -> ${decodedUser.username} -> connected`) // eslint-disable-line no-console

    const user = await User.findById(decodedUser.id)

    if (!user.sockets.includes(socket.id)) {
      user.sockets.push(socket.id)
      user.dateOnline = Date.now()
      user.isOnline = true
      user.save()
    }

    socket.on('disconnect', async () => {
      console.log(`${socket.id} -> ${decodedUser.username} -> disconnected`) // eslint-disable-line no-console

      const user = await User.findById(decodedUser.id)
      const index = user.sockets.indexOf(socket.id)
      user.sockets.splice(index, 1)

      if (user.sockets.length < 1) {
        user.isOnline = false
        user.dateOffline = Date.now()
      }

      user.save()
    })
  } else {
    console.log(`${socket.id} -> GUEST -> connected`) // eslint-disable-line no-console

    socket.on('disconnect', async () => {
      console.log(`${socket.id} -> GUEST -> disconnected`) // eslint-disable-line no-console
    })
  }
})
