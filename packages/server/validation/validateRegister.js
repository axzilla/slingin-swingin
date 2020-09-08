const Validator = require('validator')

function validateRegister(data) {
  let errors = {}

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Username must be between 2 and 30 characters long'
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'No valid email'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters long'
  }

  return { errors }
}

module.exports = validateRegister
