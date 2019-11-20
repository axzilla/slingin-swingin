const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostAnswerInput(data) {
  let errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''

  if (!Validator.isLength(data.text, { min: 27 })) {
    errors.text = 'Antwort muss mindestens 20 Zeichen lang sein'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
