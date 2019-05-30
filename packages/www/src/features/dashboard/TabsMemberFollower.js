// Packages
import React, { useState } from 'react'

// Components
import ProfilesCard from '../profile/ProfilesCard'

// Material Core
import { Grid, Button } from '@material-ui/core'

const TabsPostBookmarks = ({ profile }) => {
  const location = 'getProfilesByFollowerId'

  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const content = profile.profilesByFollowerId
    .slice(0, limit)
    .map((profile, i) => (
      <ProfilesCard key={i} profile={profile} location={location} />
    ))
  return (
    <Grid>
      {content}
      {profile.profilesByFollowerId &&
      content.length === profile.profilesByFollowerId.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

export default TabsPostBookmarks
