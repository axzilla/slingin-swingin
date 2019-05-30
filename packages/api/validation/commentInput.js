const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostAnswerInput(data) {
  let errors = {}

  data.postComment = !isEmpty(data.text) ? data.text : ''

  if (!Validator.isLength(data.text, { min: 10 })) {
    errors.text = 'Kommentar muss mindestens 10 Zeichen lang sein'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
