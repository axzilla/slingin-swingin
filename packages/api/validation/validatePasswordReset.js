const Validator = require('validator')

function validatePasswordReset(data) {
  let errors = {}

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Passwort ist ein Pflichtfeld'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Passwort muss zwischen 6 und 30 Zeichen lang sein'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Bitte gebe dein Passwort erneut ein'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwörter stimmen nicht überein'
  }

  return { errors }
}

module.exports = validatePasswordReset
