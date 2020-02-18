// import React from 'react'
import PropTypes from 'prop-types'

// import htmlToMui from '@utils/htmlToMui'
// import markdownToHtml from '@utils/markdownToHtml'

function PostDetailsItemContent({ post }) {
  // return <div dangerouslySetInnerHTML={{ __html: htmlToMui(markdownToHtml(post.content)) }} />
  return post.content
}

PostDetailsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDetailsItemContent
