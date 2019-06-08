// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Features
import PostFeedItem from '../post/PostFeedItem'

// Material Core
import { Grid, Button } from '@material-ui/core'

const TabsPostDrafts = ({ postsDraftsByUserId, auth }) => {
  const clickLocation = 'postsByUserId'

  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const content = postsDraftsByUserId
    .slice(0, limit)
    .map(post => (
      <PostFeedItem key={post._id} post={post} auth={auth} clickLocation={clickLocation} />
    ))

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
