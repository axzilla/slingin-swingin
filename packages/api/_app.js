require('dotenv').config()

// Packages
const express = require('express')
const passport = require('passport')
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express')

// App
const app = express()

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

// App Settings
app.use(cors())
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb', extended: true }))
app.use(passport.initialize())

// App Routes
app.use('/_admin', require('./routes/_admin'))
app.use('/auth', require('./routes/auth'))
app.use('/posts', require('./routes/posts'))
app.use('/comments', require('./routes/comments'))
app.use('/user', require('./routes/user'))
app.use('/chats', require('./routes/chats'))
app.use('/place', require('./routes/place'))
app.use('/placereview', require('./routes/placeReview'))
app.use('/mediafile', require('./routes/mediaFile'))

require('./utils/passport')(passport)

module.exports = app
