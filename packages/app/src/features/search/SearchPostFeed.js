import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { handlePostLikes, handlePostBookmarks } from '../post/_services'
import Spinner from '../common/Spinner'
import PostFeedItem from '../post/PostFeedItem'
import { Grid, Button } from '@material-ui/core'

const SearchPostFeed = ({ searchResult, setSearchResult }) => {
  const [limit, setLinmit] = useState(10)
  const { posts } = searchResult

  const loadMore = () => {
    setLinmit(limit + 10)
  }

  function onLikeClick(postId) {
    handlePostLikes(postId).then(res => {
      const updatedPost = res.data

      const index = posts.indexOf(
        posts.filter(post => {
          return post._id === updatedPost._id
        })[0]
      )

      setSearchResult({
        ...searchResult,
        posts: [...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)]
      })
    })
  }

  function onBookmarkClick(postId) {
    handlePostBookmarks(postId).then(res => {
      const updatedPost = res.data

      const index = posts.indexOf(
        posts.filter(post => {
          return post._id === updatedPost._id
        })[0]
      )

      setSearchResult({
        ...searchResult,
        posts: [...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)]
      })
    })
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
    <Grid container justify="center">
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
