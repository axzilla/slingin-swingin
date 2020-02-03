import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import BookmarkIcon from '@material-ui/icons/Bookmark'

function Boomarks({ onBookmarkClick, post, user }) {
  return (
    <IconButton onClick={() => onBookmarkClick(post._id, post.shortId)}>
      {post.bookmarks.includes(user.id) ? <BookmarkIcon /> : <BookmarkIcon color="primary" />}
    </IconButton>
  )
}

Boomarks.propTypes = {
  onBookmarkClick: PropTypes.func,
  post: PropTypes.object,
  user: PropTypes.object
}

export default Boomarks
