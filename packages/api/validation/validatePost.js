const Validator = require('validator')

function validatePost(data) {
  let errors = {}

  if (!Validator.isLength(data.title, { min: 10 })) {
    errors.title = 'Titel muss mindestens 10 Zeichen lang sein'
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Titel ist ein Pflichtfeld'
  }

  if (!Validator.isLength(data.text, { min: 27 })) {
    errors.text = 'Beitrag muss mindestens 20 Zeichen lang sein'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text ist ein Pflichtfeld'
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = 'Beitragstyp ist ein Pflichtfeld'
  }

  return { errors }
}

module.exports = validatePost
