const Validator = require('validator')

function validatePost(data) {
  let errors = {}

  if (!Validator.isLength(data.title, { min: 10 })) {
    errors.title = 'Title must be at least 10 characters long'
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required'
  }

  if (!Validator.isLength(data.text, { min: 27 })) {
    errors.text = 'Post must be at least 20 characters long'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Post is required'
  }

  return { errors }
}

module.exports = validatePost
