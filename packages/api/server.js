require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(cors())

app.use('/admin', require('./routes/admin'))
app.use('/users', require('./routes/users'))
app.use('/profile', require('./routes/profile'))
app.use('/posts', require('./routes/posts'))
app.use('/comments', require('./routes/comments'))
app.use('/search', require('./routes/search'))

require('./config/passport')(passport)

const db = process.env.MONGO_URI
const port = process.env.PORT || 5000

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    app.listen(port, () => console.log(`Server running on port ${port}`))
  })
  .catch(err => console.log(err))

app.use('../app/public', express.static(__dirname + '../app/public'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../app/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'))
  })
}
