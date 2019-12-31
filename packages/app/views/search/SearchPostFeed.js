import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { postToggleLikes, postToggleBookmarks } from '../../services/post'
import Spinner from '../common/Spinner'
import { PostFeedItem } from '../../components'
import { Grid, Button } from '@material-ui/core'

function SearchPostFeed({ searchResult, setSearchResult }) {
  const [limit, setLinmit] = useState(10)
  const { posts } = searchResult

  function loadMore() {
    setLinmit(limit + 10)
  }

  async function onLikeClick(postId) {
    try {
      const updatedPost = await postToggleLikes(postId)

      const index = posts.indexOf(
        posts.filter(post => {
          return post._id === updatedPost.data._id
        })[0]
      )

      setSearchResult({
        ...searchResult,
        posts: [...posts.slice(0, index), updatedPost.data, ...posts.slice(index + 1)]
      })
    } catch (error) {
      if (error) throw error
    }
  }

  async function onBookmarkClick(postId) {
    try {
      const updatedPost = await postToggleBookmarks(postId)

      const index = posts.indexOf(
        posts.filter(post => {
          return post._id === updatedPost.data._id
        })[0]
      )

      setSearchResult({
        ...searchResult,
        posts: [...posts.slice(0, index), updatedPost.data, ...posts.slice(index + 1)]
      })
    } catch (error) {
      if (error) throw error
    }
  }

  let postContent
  if (posts === null) {
    postContent = <Spinner />
  } else {
    postContent = searchResult.posts
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
      <Grid item xs={12} sm={6}>
        {postContent}
        {posts && postContent.length === posts.length ? null : (
          <Button onClick={loadMore} variant="outlined" color="primary">
            Mehr...
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

SearchPostFeed.propTypes = {
  posts: PropTypes.array,
  searchString: PropTypes.string,
  searchResult: PropTypes.object,
  setSearchResult: PropTypes.func
}

export default SearchPostFeed
