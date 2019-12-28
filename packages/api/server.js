require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())

app.use('/auth', require('./routes/auth'))
app.use('/profile', require('./routes/profile'))
app.use('/posts', require('./routes/posts'))
app.use('/comments', require('./routes/comments'))
app.use('/subcomments', require('./routes/subComments'))
app.use('/search', require('./routes/search'))

require('./utils/passport')(passport)

const db = process.env.MONGO_URI
const port = process.env.PORT || 5000

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    app.listen(port, () => console.log(`Server running on port ${port}`))
  })
  .catch(err => console.log(err))
