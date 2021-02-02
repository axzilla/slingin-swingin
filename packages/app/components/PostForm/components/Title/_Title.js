// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import TextField from '@components/TextField'

// MUI
import Typography from '@material-ui/core/Typography'

function Title({ errors, title, setTitle }) {
  function handleTitleChange(event) {
    setTitle(event.target.value)
  }

  return (
    <>
      <Typography color="textSecondary" gutterBottom>
        Title
      </Typography>
      <TextField
        error={errors && errors.title}
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
