const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateForgotPasswordInput(data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Keine gültige E-Mail Adresse'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-Mail ist ein Pflichtfeld'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
