const Validator = require('validator')

function validatePost(data) {
  let errors = {}

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required'
  }

  return { errors }
}

module.exports = validatePost
