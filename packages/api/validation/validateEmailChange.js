const Validator = require('validator')

function validateEmailChange(data) {
  let errors = {}

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Keine gültige E-Mail Adresse'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-Mail Adresse ist ein Pflichtfeld'
  }

  return { errors }
}

module.exports = validateEmailChange
