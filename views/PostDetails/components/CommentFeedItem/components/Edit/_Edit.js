import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Quill from '@components/Quill'
import htmlRemove from '@utils/htmlRemove'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function CommentEdit({ comment, handleSaveClick }) {
  const [text, setText] = useState('')

  useEffect(() => {
    setText(comment.text)
  }, [])

  async function onTextChange(value) {
    // value instead event.target.value - is quill specified
    setText(value)
  }

  return (
    <Grid>
      <form>
        <Quill value={text} onChange={onTextChange} placeholder="Edit your comment..." />
        <Button
          disabled={!htmlRemove(text).length}
          onClick={() => handleSaveClick(text)}
          variant="outlined"
          color="primary"
        >
          Save
        </Button>
      </form>
    </Grid>
  )
}

CommentEdit.propTypes = {
  comment: PropTypes.string,
  handleSaveClick: PropTypes.func
}

export default CommentEdit
