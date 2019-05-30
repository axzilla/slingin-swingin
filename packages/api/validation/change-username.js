const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateChangeUsernameInput(data) {
  let errors = {}

  data.username = !isEmpty(data.username) ? data.username : ''


  if (Validator.isEmpty(data.username)) {
    errors.username = 'Benutzername ist ein Pflichtfeld'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
