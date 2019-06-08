import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../common/Spinner'
import PostFeedItem from '../post/PostFeedItem'

import { Grid, Button } from '@material-ui/core'

const Posts = ({ postsByUserId, profile }) => {
  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const clickLocation = 'postsByUserId'
  let postContent

  if (postsByUserId === null) {
    postContent = <Spinner />
  } else {
    postContent = postsByUserId
      .slice(0, limit)
      .map(post => (
        <PostFeedItem
          clickLocation={clickLocation}
          key={post._id}
          userPostsId={profile.user._id}
          post={post}
        />
      ))
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
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

Posts.propTypes = {
  postsByUserId: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired
}

export default Posts
