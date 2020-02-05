import React from 'react'
import PropTypes from 'prop-types'

import htmlToMui from '@utils/htmlToMui'

function PostDeatilsItemContent({ post }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlToMui(post.text) }} />
}

PostDeatilsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDeatilsItemContent
