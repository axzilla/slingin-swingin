const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostAnswerInput(data) {
  let errors = {};

  data.answerComment = !isEmpty(data.answerComment) ? data.answerComment : '';

  if (!Validator.isLength(data.answerComment, { min: 10 })) {
    errors.answerComment = 'Kommentar muss mindestens 10 Zeichen lang sein';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
