// Packages
import React from 'react'
import CodeBlock from '../common/CodeBlock'
import ReactMarkdown from 'react-markdown'

// Material Core
import { Typography } from '@material-ui/core'

const CommentFeedItemtext = ({ comment }) => {
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

export default CommentFeedItemtext
