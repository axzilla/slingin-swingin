const Validator = require('validator')

function validatePasswordReset(data) {
  let errors = {}

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters long'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Please enter your password again'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords do not match'
  }

  return { errors }
}

module.exports = validatePasswordReset
