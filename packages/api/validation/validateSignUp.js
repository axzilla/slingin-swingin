const Validator = require('validator')

function validateSignUp(data) {
  let errors = {}

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = '2 - 30 characters'
  }

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = '2 - 30 characters'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'No valid email'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = '6 - 30 characters '
  }

  return { errors }
}

module.exports = validateSignUp
