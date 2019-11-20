const Validator = require('validator')
const isEmpty = require('../utils/isEmpty')

module.exports = function validatePasswordChange(data) {
  let errors = {}

  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : ''
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : ''
  data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : ''

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

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
