import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { MarkdownEditor } from '../../../components'
import { Grid, Button } from '@material-ui/core'

function SubCommentEdit({ subComment, onSaveClick }) {
  const [text, setText] = useState('')

  useEffect(() => {
    setText(subComment.text)
  }, [])

  function onChange(event) {
    setText(event.target.value)
  }

  return (
    <form>
      <MarkdownEditor withPreview text={text} setText={setText} onChange={onChange} value={text} />

      <Grid container direction="row" justify="space-between" alignItems="center">
        <Button onClick={() => onSaveClick(text)} variant="outlined" color="primary">
          Save
        </Button>
      </Grid>
    </form>
  )
}

SubCommentEdit.propTypes = {
  subComment: PropTypes.string,
  onSaveClick: PropTypes.func
}

export default SubCommentEdit
