import React from 'react'
import PropTypes from 'prop-types'

import htmlToMui from '@utils/htmlToMui'

function CommentFeedItemtext({ comment }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlToMui(comment.content) }} />
}

CommentFeedItemtext.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemtext
