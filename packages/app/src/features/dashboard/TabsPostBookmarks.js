import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { handlePostLikes, handlePostBookmarks } from '../post/_services'
import PostFeedItem from '../post/PostFeedItem'
import { Grid, Button } from '@material-ui/core'

function TabsPostBookmarks({ postsByUserBookmark, setPostsByUserBookmark, auth }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  function onLikeClick(postId) {
    handlePostLikes(postId).then(res => {
      const updatedPost = res.data

      const index = postsByUserBookmark.indexOf(
        postsByUserBookmark.filter(post => {
          return post._id === updatedPost._id
        })[0]
      )

      setPostsByUserBookmark([
        ...postsByUserBookmark.slice(0, index),
        updatedPost,
        ...postsByUserBookmark.slice(index + 1)
      ])
    })
  }

  function onBookmarkClick(postId) {
    handlePostBookmarks(postId).then(res => {
      const updatedPost = res.data

      const index = postsByUserBookmark.indexOf(
        postsByUserBookmark.filter(post => {
          return post._id === updatedPost._id
        })[0]
      )

      setPostsByUserBookmark([
        ...postsByUserBookmark.slice(0, index),
        updatedPost,
        ...postsByUserBookmark.slice(index + 1)
      ])
    })
  }

  const content = postsByUserBookmark
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
      {postsByUserBookmark && content.length === postsByUserBookmark.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

TabsPostBookmarks.propTypes = {
  postsByUserBookmark: PropTypes.array.isRequired,
  setPostsByUserBookmark: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default TabsPostBookmarks
