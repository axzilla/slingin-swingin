const Validator = require('validator')

function validateUsernameChange(data) {
  let errors = {}

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required'
  }

  return { errors }
}

module.exports = validateUsernameChange
