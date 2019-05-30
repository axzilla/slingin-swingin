// Packages
import React, { useState } from 'react'

// Features
import ProfilesCard from '../profile/ProfilesCard'

// Material Core
import { Grid, Button } from '@material-ui/core'

const TabsPostBookmarks = ({ profile }) => {
  const location = 'getProfilesByFollowingId'

  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const content = profile.profilesByFollowingId
    .slice(0, limit)
    .map((profile, i) => (
      <ProfilesCard key={i} profile={profile} location={location} />
    ))
  return (
    <Grid>
      {content}
      {profile.profilesByFollowingId &&
      content.length === profile.profilesByFollowingId.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

export default TabsPostBookmarks
