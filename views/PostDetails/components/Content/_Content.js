import PropTypes from 'prop-types'

import rawToHtml from '@utils/rawToHtml'

function PostDetailsItemContent({ post }) {
  return <div dangerouslySetInnerHTML={{ __html: rawToHtml(post.content) }} />
}

PostDetailsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDetailsItemContent
