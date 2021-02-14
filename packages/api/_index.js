const io = require('./_socketio')
global.io = io

// Packages
const mongoose = require('mongoose')

const db = process.env.MONGODB_URI

const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(db, mongooseOptions, () => console.log('MongoDB Connected')) // eslint-disable-line no-console
global.userSocketIdMap = new Map()

global.io.on('connection', socket => {
  // https://medium.com/@albanero/socket-io-track-online-users-d8ed1df2cb88
  async function addClientToMap(userId, socketId) {
    if (!global.userSocketIdMap.has(userId)) {
      // when user is joining first time
      global.userSocketIdMap.set(userId, new Set([socketId]))
      console.log(global.userSocketIdMap) // eslint-disable-line
      global.io.emit('online', Array.from(global.userSocketIdMap.keys()))
    } else {
      // user had already joined from one client and now joining using another client
      global.userSocketIdMap.get(userId).add(socketId)
      console.log(global.userSocketIdMap) // eslint-disable-line
      global.io.emit('online', Array.from(global.userSocketIdMap.keys()))
    }
  }

  function removeClientFromMap(userId, socketId) {
    if (global.userSocketIdMap.has(userId)) {
      let userSocketIdSet = global.userSocketIdMap.get(userId)
      userSocketIdSet.delete(socketId)
      console.log(global.userSocketIdMap) // eslint-disable-line
      global.io.emit('online', Array.from(global.userSocketIdMap.keys()))

      // if there are no clients for a user, remove that user from online list(map)
      if (userSocketIdSet.size == 0) {
        global.userSocketIdMap.delete(userId)
        console.log(global.userSocketIdMap) // eslint-disable-line
        global.io.emit('online', Array.from(global.userSocketIdMap.keys()))
      }
    }
  }

  const { userId } = socket.handshake.query

  socket.on('connected', () => {
    addClientToMap(userId, socket.id)
  })

  socket.on('disconnect', () => {
    removeClientFromMap(userId, socket.id)
  })
})
