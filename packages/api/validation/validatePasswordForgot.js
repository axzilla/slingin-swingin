const Validator = require('validator')

function validatePasswordForgot(data) {
  let errors = {}

  if (!Validator.isEmail(data.email)) {
    errors.email = 'No valid email'
  }

  return { errors }
}

module.exports = validatePasswordForgot
