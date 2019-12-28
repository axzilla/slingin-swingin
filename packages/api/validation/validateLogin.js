const Validator = require('validator')

function validateLogin(data) {
  let errors = {}

  if (Validator.isEmpty(data.login)) {
    errors.login = 'Benutzername oder E-Mail ist ein Pflichtfeld'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Passwort ist ein Pflichtfeld'
  }

  return { errors }
}

module.exports = validateLogin
