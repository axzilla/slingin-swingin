import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { postToggleLikes, postToggleBookmarks } from '../../services/post'
import PostFeedItem from '../post/PostFeedItem'
import { Grid, Button } from '@material-ui/core'

function TabsPostBookmarks({ postsByUserBookmark, setPostsByUserBookmark, auth }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  async function onLikeClick(postId) {
    try {
      const updatedPost = await postToggleLikes(postId)

      const index = postsByUserBookmark.indexOf(
        postsByUserBookmark.filter(post => {
          return post._id === updatedPost.data_id
        })[0]
      )

      setPostsByUserBookmark([
        ...postsByUserBookmark.slice(0, index),
        updatedPost.data,
        ...postsByUserBookmark.slice(index + 1)
      ])
    } catch (error) {
      if (error) throw error
    }
  }

  async function onBookmarkClick(postId) {
    try {
      const updatedPost = await postToggleBookmarks(postId)

      const index = postsByUserBookmark.indexOf(
        postsByUserBookmark.filter(post => {
          return post._id === updatedPost.data._id
        })[0]
      )

      setPostsByUserBookmark([
        ...postsByUserBookmark.slice(0, index),
        updatedPost.data,
        ...postsByUserBookmark.slice(index + 1)
      ])
    } catch (error) {
      if (error) throw error
    }
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
  postsByUserBookmark: PropTypes.array,
  setPostsByUserBookmark: PropTypes.func,
  auth: PropTypes.object
}

export default TabsPostBookmarks
