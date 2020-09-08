import PropTypes from 'prop-types'

import rawToHtml from '@utils/rawToHtml'
import htmlToMui from '@utils/htmlToMui'

function PostDetailsItemContent({ post }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlToMui(rawToHtml(post.content)) }} />
}

PostDetailsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDetailsItemContent
