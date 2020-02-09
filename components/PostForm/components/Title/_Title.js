import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@components/TextField'

function Title({ errors, title, setTitle }) {
  function handleTitleChange(event) {
    setTitle(event.target.value)
  }

  return (
    <>
      <TextField
        error={errors && errors.title}
        label="Title"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />
    </>
  )
}

Title.propTypes = {
  errors: PropTypes.object,
  title: PropTypes.string,
  setTitle: PropTypes.func
}

export default Title
