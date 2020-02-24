import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@components/Spinner'
import PostFeedItem from '@components/PostFeedItem'

import Grid from '@material-ui/core/Grid'

function SearchPostFeed({ searchResult }) {
  const { posts } = searchResult

  let postContent
  if (posts === null) {
    postContent = <Spinner />
  } else {
    postContent = searchResult.posts.map(post => <PostFeedItem key={post._id} post={post} />)
  }

  return <Grid>{postContent}</Grid>
}

SearchPostFeed.propTypes = {
  posts: PropTypes.array,
  searchResult: PropTypes.object
}

export default SearchPostFeed
