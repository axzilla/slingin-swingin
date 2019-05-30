// Packages
import React, { useState } from 'react'

// Features
import Spinner from '../common/Spinner'
import ProfilesCard from '../profile/ProfilesCard'

// Material Core
import { Grid, Button } from '@material-ui/core'

const SearchProfileFeed = props => {
  const { profiles, searchString } = props
  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  let profileItems

  if (profiles === null) {
    profileItems = <Spinner />
  } else {
    const location = 'getProfilesBySearch'
    profileItems = profiles
      .slice(0, limit)
      .map((profile, i) => (
        <ProfilesCard
          location={location}
          key={i}
          profile={profile}
          searchString={searchString}
        />
      ))
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        {profileItems}
        {profiles && profileItems.length === profiles.length ? null : (
          <Button onClick={loadMore} variant="outlined" color="primary">
            Mehr...
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

export default SearchProfileFeed
