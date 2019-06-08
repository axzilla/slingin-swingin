import React, { useState } from 'react'
import PropTypes from 'prop-types'

import PostFeedItem from '../post/PostFeedItem'

import { Grid, Button } from '@material-ui/core'

function TabsPostPosts({ postsByUserId, auth }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  const content =
    postsByUserId &&
    postsByUserId
      .slice(0, limit)
      .map(post => <PostFeedItem key={post._id} post={post} auth={auth} />)

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
  auth: PropTypes.object.isRequired
}

export default TabsPostPosts
