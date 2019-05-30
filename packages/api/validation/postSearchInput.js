const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostSearchInput(data) {
  let errors = {};

  data.searchText = !isEmpty(data.searchText) ? data.searchText : '';

  if (Validator.isEmpty(data.searchText)) {
    errors.searchText = 'Suchfeld darf nicht leer sein';
  }

  if (!Validator.isLength(data.searchText, { min: 5 })) {
    errors.searchText = 'Suche muss mindestens 5 Zeichen lang sein';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
