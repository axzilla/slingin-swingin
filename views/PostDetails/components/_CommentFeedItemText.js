import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

function CommentFeedItemtext({ comment }) {
  return <Typography>{comment.text}</Typography>
}

CommentFeedItemtext.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemtext
