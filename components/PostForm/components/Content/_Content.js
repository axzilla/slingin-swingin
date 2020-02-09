import React from 'react'
import PropTypes from 'prop-types'

import Editor from '@components/Editor'

function Content({ content, setContent, errors }) {
  async function handleContentChange(value) {
    // value instead event.target.value - is Quill editor specified
    setContent(value)
  }

  return (
    <Editor
      error={errors && errors.content}
      value={content}
      onChange={handleContentChange}
      placeholder="Content"
    />
  )
}

Content.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
  errors: PropTypes.object
}

export default Content
