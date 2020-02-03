import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Spinner from '@components/Spinner'
import PostFeedItem from '@components/Spinner'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function ProfileDetailsTabsPosts({ postsByUserId }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  let postContent

  if (postsByUserId === null) {
    postContent = <Spinner />
  } else {
    postContent = postsByUserId
      .slice(0, limit)
      .map(post => <PostFeedItem key={post._id} post={post} />)
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
  postsByUserId: PropTypes.array
}

export default ProfileDetailsTabsPosts
