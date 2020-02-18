import React from 'react'
import PropTypes from 'prop-types'

import EditorPost from '@components/EditorPost'

function Content({ content, setContent, errors }) {
  return (
    <EditorPost
      content={content}
      setContent={setContent}
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
