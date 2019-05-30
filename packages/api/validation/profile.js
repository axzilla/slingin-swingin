const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''

  if (!Validator.isLength(data.name, { min: 2, max: 40 })) {
    errors.name = 'Name muss zwischen 2und 40 Zeichen lang sein'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name ist ein Pflichtfeld'
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Keine gültige URL'
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Keine gültige URL'
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Keine gültige URL'
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Keine gültige URL'
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Keine gültige URL'
    }
  }

  if (!isEmpty(data.xing)) {
    if (!Validator.isURL(data.xing)) {
      errors.instagram = 'Keine gültige URL'
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Keine gültige URL'
    }
  }

  if (!isEmpty(data.pinterest)) {
    if (!Validator.isURL(data.pinterest)) {
      errors.instagram = 'Keine gültige URL'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
