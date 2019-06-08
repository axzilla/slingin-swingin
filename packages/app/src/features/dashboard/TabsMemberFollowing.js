import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ProfilesCard from '../profile/ProfilesCard'

import { Grid, Button } from '@material-ui/core'

function TabsPostBookmarks({ profilesByFollowingId }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  const content =
    profilesByFollowingId &&
    profilesByFollowingId
      .slice(0, limit)
      .map(profile => <ProfilesCard key={profile._id} profile={profile} location={location} />)
  return (
    <Grid>
      {content}
      {profilesByFollowingId && content.length === profilesByFollowingId.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

TabsPostBookmarks.propTypes = {
  profilesByFollowingId: PropTypes.array.isRequired
}

export default TabsPostBookmarks
