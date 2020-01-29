const Validator = require('validator')

function validateLogin(data) {
  let errors = {}

  if (Validator.isEmpty(data.login)) {
    errors.login = 'Username oder email is required'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  return { errors }
}

module.exports = validateLogin
