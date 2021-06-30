require('dotenv').config()

// Packages
const express = require('express')
const passport = require('passport')
const cors = require('cors')

// App
const app = express()

// App Settings
app.use(cors())
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb', extended: true }))
app.use(passport.initialize())

// App Routes
app.use('/auth', require('./routes/auth'))
app.use('/posts', require('./routes/posts'))
app.use('/comments', require('./routes/comments'))
app.use('/user', require('./routes/user'))
app.use('/chats', require('./routes/chats'))
app.use('/place', require('./routes/place'))
app.use('/mediafile', require('./routes/mediaFile'))
app.use('/sitemap', require('./routes/sitemap'))

require('./utils/passport')(passport)

module.exports = app
