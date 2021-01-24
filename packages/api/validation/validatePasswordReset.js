const Validator = require('validator')

function validatePasswordReset(data) {
  let errors = {}

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = '6 - 30 characters'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = 'Passwords do not match'
    errors.password2 = 'Passwords do not match'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Re-enter password'
  }

  return { errors }
}

module.exports = validatePasswordReset
