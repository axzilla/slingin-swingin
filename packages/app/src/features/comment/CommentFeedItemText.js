import React from 'react'
import PropTypes from 'prop-types'
import CodeBlock from '../common/CodeBlock'
import ReactMarkdown from 'react-markdown'

function CommentFeedItemtext({ comment }) {
  return (
    <ReactMarkdown
      source={comment.text}
      escapeHtml={false}
      renderers={{ code: CodeBlock }}
      type="read"
    />
  )
}

CommentFeedItemtext.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemtext
