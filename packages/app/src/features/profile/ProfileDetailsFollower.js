// Packages
import React, { useState } from 'react'
import { connect } from 'react-redux'

// Features
import Spinner from '../common/Spinner'
import ProfilesCard from './ProfilesCard'

// Material Core
import { Grid, Button } from '@material-ui/core'

const Profiles = props => {
  const { profilesByFollowerId, loading } = props.profile
  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  let profileItems

  if (profilesByFollowerId === null || loading) {
    profileItems = <Spinner />
  } else {
    const location = 'getProfilesByFollowerId'
    profileItems = profilesByFollowerId.slice(0, limit).map(profile => (
      <Grid item xs={12} key={profile._id}>
        <ProfilesCard profile={profile} location={location} />
      </Grid>
    ))
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        {profileItems}
        {profilesByFollowerId && profileItems.length === profilesByFollowerId.length ? null : (
          <Button onClick={loadMore} variant="outlined" color="primary">
            Mehr...
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(Profiles)
