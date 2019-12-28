const Validator = require('validator')

function validateRegister(data) {
  let errors = {}

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Benutzername muss zwischen 2 und 30 Zeichen lang sein'
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Benutzername ist ein Pflichtfeld'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-Mail ist ein Pflichtfeld'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Keine gültige E-Mail Adresse'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Passwort ist ein Pflichtfeld'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Passwort muss zwischen 6 und 30 Zeichen lang sein'
  }

  return { errors }
}

module.exports = validateRegister
