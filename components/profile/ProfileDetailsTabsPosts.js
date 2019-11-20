import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { handlePostLikes, handlePostBookmarks } from '../post/_services'
import Spinner from '../common/Spinner'
import PostFeedItem from '../post/PostFeedItem'
import { Grid, Button } from '@material-ui/core'

function ProfileDetailsTabsPosts({ postsByUserId, setPostsByUserId }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  function onLikeClick(postId) {
    handlePostLikes(postId).then(res => {
      const updatedPost = res.data

      const index = postsByUserId.indexOf(
        postsByUserId.filter(post => {
          return post._id === updatedPost._id
        })[0]
      )

      setPostsByUserId([
        ...postsByUserId.slice(0, index),
        updatedPost,
        ...postsByUserId.slice(index + 1)
      ])
    })
  }

  function onBookmarkClick(postId) {
    handlePostBookmarks(postId).then(res => {
      const updatedPost = res.data

      const index = postsByUserId.indexOf(
        postsByUserId.filter(post => {
          return post._id === updatedPost._id
        })[0]
      )

      setPostsByUserId([
        ...postsByUserId.slice(0, index),
        updatedPost,
        ...postsByUserId.slice(index + 1)
      ])
    })
  }

  let postContent

  if (postsByUserId === null) {
    postContent = <Spinner />
  } else {
    postContent = postsByUserId
      .slice(0, limit)
      .map(post => (
        <PostFeedItem
          key={post._id}
          post={post}
          onLikeClick={onLikeClick}
          onBookmarkClick={onBookmarkClick}
        />
      ))
  }

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} md={6}>
        {postContent}
        {postsByUserId && postContent.length === postsByUserId.length ? null : (
          <Button onClick={loadMore} variant="outlined" color="primary">
            Mehr...
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

ProfileDetailsTabsPosts.propTypes = {
  postsByUserId: PropTypes.array,
  setPostsByUserId: PropTypes.func
}

export default ProfileDetailsTabsPosts
