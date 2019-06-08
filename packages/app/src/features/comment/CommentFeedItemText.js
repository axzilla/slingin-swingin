// Packages
import React from 'react'
import PropTypes from 'prop-types'
import CodeBlock from '../common/CodeBlock'
import ReactMarkdown from 'react-markdown'

// Material Core
import { Typography } from '@material-ui/core'

function CommentFeedItemtext({ comment }) {
  return (
    <Typography>
      <ReactMarkdown
        source={comment.text}
        escapeHtml={false}
        renderers={{ code: CodeBlock }}
        type="read"
      />
    </Typography>
  )
}

CommentFeedItemtext.propTypes = {
  comment: PropTypes.string.isRequired
}

export default CommentFeedItemtext
