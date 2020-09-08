const Validator = require('validator')

function validateEmailChange(data) {
  let errors = {}

  if (!Validator.isEmail(data.email)) {
    errors.email = 'No valid email'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  return { errors }
}

module.exports = validateEmailChange
