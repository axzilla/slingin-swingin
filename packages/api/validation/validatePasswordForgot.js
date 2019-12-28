const Validator = require('validator')

function validatePasswordForgot(data) {
  let errors = {}

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Keine gültige E-Mail Adresse'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-Mail ist ein Pflichtfeld'
  }

  return { errors }
}

module.exports = validatePasswordForgot
