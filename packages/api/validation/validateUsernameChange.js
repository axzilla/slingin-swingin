const Validator = require('validator')

function validateUsernameChange(data) {
  let errors = {}

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Benutzername ist ein Pflichtfeld'
  }

  return { errors }
}

module.exports = validateUsernameChange
