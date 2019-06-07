// Packages
import React, { useState } from 'react'

// Features
import ProfilesCard from '../profile/ProfilesCard'

// Material Core
import { Grid, Button } from '@material-ui/core'

const TabsPostBookmarks = ({ profilesByFollowingId }) => {
  const location = 'getProfilesByFollowingId'

  const [limit, setLimit] = useState(10)

  const loadMore = () => {
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

export default TabsPostBookmarks
