const io = require('./_socketio')
global.io = io

// Packages
const mongoose = require('mongoose')

const db = process.env.MONGO_URI

const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(db, mongooseOptions, () => console.log('MongoDB Connected')) // eslint-disable-line no-console

io.sockets.on('connection', socket => {
  console.log(`${socket.id} -> connected`) // eslint-disable-line no-console

  socket.on('chats', currentUserId => {
    console.log(`Socket ${socket.id} joining chats-${currentUserId}`) // eslint-disable-line no-console
    socket.join(`chats-${currentUserId}`)
  })

  socket.on('notifications', currentUserId => {
    console.log(`Socket ${socket.id} joining notifications-${currentUserId}`) // eslint-disable-line no-console
    socket.join(`notifications-${currentUserId}`)
  })

  socket.on('disconnect', async () => {
    console.log(`${socket.id} -> disconnected`) // eslint-disable-line no-console
  })

  // const decodedUser =
  //   socket.handshake.headers.cookie && cookie.parse(socket.handshake.headers.cookie).jwtToken
  //     ? jwtDecode(cookie.parse(socket.handshake.headers.cookie).jwtToken)
  //     : null

  // if (decodedUser) {
  //   console.log(`${socket.id} -> ${decodedUser.username} -> connected`) // eslint-disable-line no-console

  //   const user = await User.findById(decodedUser._id)

  //   if (!user.sockets.includes(socket.id)) {
  //     user.sockets.push(socket.id)
  //     user.dateOnline = Date.now()
  //     user.isOnline = true
  //     user.save()
  //   }

  //   socket.on('disconnect', async () => {
  //     console.log(`${socket.id} -> ${decodedUser.username} -> disconnected`) // eslint-disable-line no-console

  //     const user = await User.findById(decodedUser._id)
  //     const index = user.sockets.indexOf(socket.id)
  //     user.sockets.splice(index, 1)

  //     if (user.sockets.length < 1) {
  //       user.isOnline = false
  //       user.dateOffline = Date.now()
  //     }

  //     user.save()
  //   })
  // } else {
  //   console.log(`${socket.id} -> GUEST -> connected`) // eslint-disable-line no-console

  //   socket.on('disconnect', async () => {
  //     console.log(`${socket.id} -> GUEST -> disconnected`) // eslint-disable-line no-console
  //   })
  // }
})
