import React, { useState } from 'react'
import PropTypes from 'prop-types'

import PostFeedItem from '../post/PostFeedItem'

import { Grid, Button } from '@material-ui/core'

function TabsPostDrafts({ postsDraftsByUserId, auth }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  const content = postsDraftsByUserId
    .slice(0, limit)
    .map(post => <PostFeedItem key={post._id} post={post} auth={auth} />)

  return (
    <Grid>
      {content}
      {postsDraftsByUserId && content.length === postsDraftsByUserId.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

TabsPostDrafts.propTypes = {
  postsDraftsByUserId: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
}

export default TabsPostDrafts
