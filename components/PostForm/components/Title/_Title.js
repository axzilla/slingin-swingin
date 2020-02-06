import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@components/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'

function Title({ errors, title, setTitle }) {
  function handleTitleChange(event) {
    setTitle(event.target.value)
  }

  return (
    <Card>
      <CardHeader title="Post Title" />
      <Divider />
      <CardContent>
        <TextField
          type="text"
          error={errors && errors.title}
          label="Title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </CardContent>
    </Card>
  )
}

Title.propTypes = {
  errors: PropTypes.object,
  title: PropTypes.string,
  setTitle: PropTypes.func
}

export default Title
