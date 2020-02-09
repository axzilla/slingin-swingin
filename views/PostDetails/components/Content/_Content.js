import React from 'react'
import PropTypes from 'prop-types'

import htmlToMui from '@utils/htmlToMui'
import markdownToHtml from '@utils/markdownToHtml'

function PostDeatilsItemContent({ post }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlToMui(markdownToHtml(post.content)) }} />
}

PostDeatilsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDeatilsItemContent
