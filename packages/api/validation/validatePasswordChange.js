const Validator = require('validator')

function validatePasswordChange(data) {
  let errors = {}

  if (Validator.isEmpty(data.oldPassword)) {
    errors.oldPassword = 'Passwort ist ein Pflichtfeld'
  }

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = 'Passwort muss zwischen 6 und 30 Zeichen lang sein'
  }

  if (Validator.isEmpty(data.newPassword2)) {
    errors.newPassword2 = 'Bitte gebe dein Passwort erneut ein'
  }

  if (!Validator.equals(data.newPassword, data.newPassword2)) {
    errors.newPassword2 = 'Passwörter stimmen nicht überein'
  }

  return { errors }
}

module.exports = validatePasswordChange
