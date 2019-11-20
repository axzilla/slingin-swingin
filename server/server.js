const express = require('express')
const next = require('next')
const cors = require('cors')
const sslRedirect = require('heroku-ssl-redirect')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const mongoose = require('mongoose')
const passport = require('passport')

const db = process.env.MONGO_URI

app
  .prepare()
  .then(() => {
    const server = express()
    const port = process.env.PORT || 3000
    server.use(sslRedirect())
    server.use(cors())
    server.use(express.urlencoded({ extended: true }))
    server.use(express.json())

    server.use('/admin', require('./routes/admin'))
    server.use('/users', require('./routes/users'))
    server.use('/profile', require('./routes/profile'))
    server.use('/posts', require('./routes/posts'))
    server.use('/comments', require('./routes/comments'))
    server.use('/subComments', require('./routes/subComments'))
    server.use('/search', require('./routes/search'))

    require('./config/passport')(passport)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    mongoose.connect(db, { useNewUrlParser: true }).then(() => {
      console.log(`MongoDB Connected on ${db}`)

      server.listen(port, err => {
        if (err) throw err
        console.log(`> next.js App Ready on ${port}`) // eslint-disable-line no-console
      })
    })
  })
  .catch(ex => {
    console.error(ex.stack) // eslint-disable-line no-console
    process.exit(1)
  })
