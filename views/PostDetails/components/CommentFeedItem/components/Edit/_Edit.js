import React, { useState } from 'react'
import PropTypes from 'prop-types'

import EditorPost from '@components/EditorPost'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function CommentEdit({ comment, handleSaveClick }) {
  const [content, setContent] = useState(JSON.parse(comment.content))

  return (
    <Grid>
      <form>
        <EditorPost content={content} setContent={setContent} placeholder="Edit comment" />
        <Button onClick={() => handleSaveClick(content)} variant="outlined" color="primary">
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
