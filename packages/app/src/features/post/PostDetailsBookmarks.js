// Packages
import React from 'react'

// Material Core
import Button from '@material-ui/core/Button'

// Material Colors
import { blue } from '@material-ui/core/colors'

const PostDetailsLikes = props => {
  const { post, auth, handlePostBookmarks } = props
  const { isAuthenticated } = props.auth

  const onBookmarkClick = (id, shortId) => {
    if (isAuthenticated) {
      const location = 'getPostByShortId'
      handlePostBookmarks(location, id, '', '', '', shortId)
    } else {
      props.history.push('/login')
    }
  }

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

export default PostDetailsLikes