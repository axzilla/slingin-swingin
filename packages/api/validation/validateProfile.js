const Validator = require('validator')
const isEmpty = require('../utils/isEmpty')

function validateProfile(data) {
  let errors = {}

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
      errors.xing = 'Keine gültige URL'
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Keine gültige URL'
    }
  }

  return { errors }
}

module.exports = validateProfile
