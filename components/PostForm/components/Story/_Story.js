import React from 'react'
import PropTypes from 'prop-types'

import Quill from '@components/Quill'

function PostForm({ content, setContent, errors }) {
  async function handleContentChange(value) {
    // value instead event.target.value - is quill specified
    setContent(value)
  }

  return (
    <>
      <div>
        <Quill error={errors && errors.content} value={content} onChange={handleContentChange} />
      </div>
    </>
  )
}

PostForm.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
  errors: PropTypes.object
}

export default PostForm
