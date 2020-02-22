import React from 'react'
import PropTypes from 'prop-types'

import rawToHtml from '@utils/rawToHtml'

function CommentFeedItemtext({ comment }) {
  return <div dangerouslySetInnerHTML={{ __html: rawToHtml(comment.content) }} />
}

CommentFeedItemtext.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemtext
