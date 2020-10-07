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
app.use('/chats', require('./routes/chats'))

require('./utils/passport')(passport)

const db = process.env.MONGO_URI
const port = process.env.PORT || 5000

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected') // eslint-disable-line no-console

    const server = app.listen(port, () => console.log(`Server running on port ${port}`)) // eslint-disable-line no-console
    const io = require('socket.io')(server)

    io.on('connection', async socket => {
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
  })
  .catch(err => console.log(err)) // eslint-disable-line no-console
