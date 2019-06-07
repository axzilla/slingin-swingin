// Packages
import React, { useState } from 'react'

// Components
import ProfilesCard from '../profile/ProfilesCard'

// Material Core
import { Grid, Button } from '@material-ui/core'

const TabsPostBookmarks = ({ profilesByFollowerId }) => {
  const location = 'getProfilesByFollowerId'

  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const content =
    profilesByFollowerId &&
    profilesByFollowerId
      .slice(0, limit)
      .map(profile => <ProfilesCard key={profile._id} profile={profile} location={location} />)
  return (
    <Grid>
      {content}
      {profilesByFollowerId && content.length === profilesByFollowerId.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

export default TabsPostBookmarks
