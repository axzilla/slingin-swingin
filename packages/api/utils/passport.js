const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('user')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_OR_KEY

function passport(passport) {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const foundUser = await User.findById(jwt_payload.id)

        if (foundUser) {
          return done(null, foundUser)
        }

        return done(null, false)
      } catch (error) {
        if (error) throw error
      }
    })
  )
}

module.exports = passport
