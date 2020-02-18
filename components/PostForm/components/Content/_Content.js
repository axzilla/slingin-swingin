import React from 'react'
import PropTypes from 'prop-types'

import EditorPost from '@components/EditorPost'
// import TextField from '@material-ui/core/TextField'

function Content({ content, setContent, errors }) {
  async function handleContentChange(event) {
    setContent(event.target.value)
  }

  return (
    <EditorPost
      fullWidth
      variant="outlined"
      multiline
      value={content}
      rows="8"
      onChange={handleContentChange}
      error={errors && errors.content}
      placeholder="Write your story or question"
    />
  )
}

Content.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
  errors: PropTypes.object
}

export default Content
