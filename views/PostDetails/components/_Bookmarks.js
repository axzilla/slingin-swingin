import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import BookmarkIcon from '@material-ui/icons/Bookmark'

function PostDetailsLikes({ onBookmarkClick, post, user }) {
  return (
    <IconButton onClick={() => onBookmarkClick(post._id, post.shortId)}>
      {post.bookmarks.map(bookmark => bookmark.user).includes(user.id) ? (
        <BookmarkIcon color="secondary" />
      ) : (
        <BookmarkIcon color="primary" />
      )}
    </IconButton>
  )
}

PostDetailsLikes.propTypes = {
  onBookmarkClick: PropTypes.func,
  post: PropTypes.object,
  user: PropTypes.string
}

export default PostDetailsLikes
