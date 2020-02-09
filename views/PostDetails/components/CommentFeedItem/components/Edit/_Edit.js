import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Editor from '@components/Editor'
import htmlRemove from '@utils/htmlRemove'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function CommentEdit({ comment, handleSaveClick }) {
  const [content, setContent] = useState('')

  useEffect(() => {
    setContent(comment.content)
  }, [])

  async function handleContentChange(value) {
    // value instead event.target.value - is Quill editor specified
    setContent(value)
  }

  return (
    <Grid>
      <form>
        <Editor value={content} onChange={handleContentChange} placeholder="Edit your comment..." />
        <Button
          disabled={!htmlRemove(content).length}
          onClick={() => handleSaveClick(content)}
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
  comment: PropTypes.object,
  handleSaveClick: PropTypes.func
}

export default CommentEdit
