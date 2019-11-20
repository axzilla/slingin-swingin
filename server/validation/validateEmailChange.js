const Validator = require('validator')
const isEmpty = require('../utils/isEmpty')

module.exports = function validateEmailChange(data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Keine gültige E-Mail Adresse'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-Mail Adresse ist ein Pflichtfeld'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
