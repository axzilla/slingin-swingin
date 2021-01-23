const Validator = require('validator')

function validateLogin(data) {
  let errors = {}

  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-Mail is required'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  return { errors }
}

module.exports = validateLogin
