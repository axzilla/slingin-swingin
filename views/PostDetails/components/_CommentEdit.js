import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import TextField from '../../../components/TextField'

// import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

// const useStyles = makeStyles({})

function CommentEdit({ comment, onSaveClick }) {
  // const classes = useStyles()
  const [text, setText] = useState('')

  useEffect(() => {
    setText(comment.text)
  }, [])

  function onChange(event) {
    setText(event.target.value)
  }

  return (
    <Grid container justify="center">
      <form>
        <TextField onChange={onChange} value={text} />
        <Button onClick={() => onSaveClick(text)} variant="outlined" color="primary">
          Save
        </Button>
      </form>
    </Grid>
  )
}

CommentEdit.propTypes = {
  comment: PropTypes.string,
  onSaveClick: PropTypes.func
}

export default CommentEdit
