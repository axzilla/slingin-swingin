import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import { blue } from '@material-ui/core/colors'

function PostDetailsLikes({ onBookmarkClick, post, auth }) {
  return (
    <Button
      onClick={() => onBookmarkClick(post._id, post.shortId)}
      disableRipple
      style={{ color: blue[500] }}
    >
      {post.bookmarks.map(bookmark => bookmark.user).includes(auth.user.id) ? (
        <i className="fas fa-bookmark fa-lg" />
      ) : (
        <i className="far fa-bookmark fa-lg" />
      )}
      &nbsp;
    </Button>
  )
}

PostDetailsLikes.propTypes = {
  onBookmarkClick: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default PostDetailsLikes
