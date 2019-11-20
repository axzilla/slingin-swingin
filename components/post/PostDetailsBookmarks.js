import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { blue } from '@material-ui/core/colors'

function PostDetailsLikes({ onBookmarkClick, post, user }) {
  return (
    <Button
      onClick={() => onBookmarkClick(post._id, post.shortId)}
      disableRipple
      style={{ color: blue[500] }}
    >
      {post.bookmarks.map(bookmark => bookmark.user).includes(user.id) ? (
        <i className="fas fa-bookmark fa-lg" />
      ) : (
        <i className="far fa-bookmark fa-lg" />
      )}
      &nbsp;
    </Button>
  )
}

PostDetailsLikes.propTypes = {
  onBookmarkClick: PropTypes.func,
  post: PropTypes.object,
  user: PropTypes.string
}

export default PostDetailsLikes
