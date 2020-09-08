const Validator = require('validator')

function validatePasswordChange(data) {
  let errors = {}

  if (Validator.isEmpty(data.oldPassword)) {
    errors.oldPassword = 'Password is required'
  }

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = 'Password must be between 6 and 30 characters long'
  }

  if (Validator.isEmpty(data.newPassword2)) {
    errors.newPassword2 = 'Please enter your password again'
  }

  if (!Validator.equals(data.newPassword, data.newPassword2)) {
    errors.newPassword2 = 'Passwords do not match'
  }

  return { errors }
}

module.exports = validatePasswordChange
