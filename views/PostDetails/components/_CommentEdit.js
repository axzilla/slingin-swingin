import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Quill from '../../../components/Quill'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function CommentEdit({ comment, onSaveClick }) {
  const [text, setText] = useState('')

  useEffect(() => {
    setText(comment.text)
  }, [])

  async function onTextChange(value) {
    // value instead event.target.value - is quill specified
    setText(value)
  }

  return (
    <Grid container justify="center">
      <form>
        <div>
          <Quill value={text} onChange={onTextChange} placeholder="Edit your comment" />
        </div>
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
