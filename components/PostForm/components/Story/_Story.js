import React from 'react'
import PropTypes from 'prop-types'

import Quill from '@components/Quill'

function PostForm({ text, setText, errors }) {
  async function onTextChange(value) {
    // value instead event.target.value - is quill specified
    setText(value)
  }

  return (
    <>
      <div>
        <Quill error={errors && errors.text} value={text} onChange={onTextChange} />
      </div>
    </>
  )
}

PostForm.propTypes = {
  text: PropTypes.string,
  setText: PropTypes.func,
  errors: PropTypes.object
}

export default PostForm
