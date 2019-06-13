import React from 'react'
import PropTypes from 'prop-types'
import CodeBlock from '../common/CodeBlock'
import ReactMarkdown from 'react-markdown'

function PostDeatilsItemContent({ post }) {
  return (
    <ReactMarkdown
      source={post.text}
      escapeHtml={false}
      renderers={{ code: CodeBlock }}
      type="read"
    />
  )
}

PostDeatilsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDeatilsItemContent
