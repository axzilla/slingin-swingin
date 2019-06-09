import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { handlePostLikes, handlePostBookmarks } from '../post/_services'
import PostFeedItem from '../post/PostFeedItem'
import { Grid, Button } from '@material-ui/core'

function TabsPostPosts({ postsByUserId, setPostsByUserId, auth }) {
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

  const content =
    postsByUserId &&
    postsByUserId
      .slice(0, limit)
      .map(post => (
        <PostFeedItem
          key={post._id}
          post={post}
          auth={auth}
          onLikeClick={onLikeClick}
          onBookmarkClick={onBookmarkClick}
        />
      ))

  return (
    <Grid>
      {content}
      {postsByUserId && content.length === postsByUserId.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

TabsPostPosts.propTypes = {
  postsByUserId: PropTypes.array.isRequired,
  setPostsByUserId: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default TabsPostPosts
