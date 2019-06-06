// Packages
import React from 'react'
import CodeBlock from '../common/CodeBlock'
import ReactMarkdown from 'react-markdown'

// Material Core
import { Typography } from '@material-ui/core'

const SubCommentFeedItemText = ({ subComment }) => {
  return (
    <Typography>
      <ReactMarkdown source={subComment.text} escapeHtml={false} renderers={{ code: CodeBlock }} />
    </Typography>
  )
}

export default SubCommentFeedItemText
