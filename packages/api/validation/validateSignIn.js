const Validator = require('validator')

function validateSignIn(data) {
  let errors = {}

  if (!Validator.isEmail(data.email)) {
    errors.email = 'No valid email'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  return { errors }
}

module.exports = validateSignIn
