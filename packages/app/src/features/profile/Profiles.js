// Packages
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'

// Features
import { getProfiles } from './_services'
import ProfilesCard from './ProfilesCard'

// Components
import CardSponsors from '../../components/cards/CardSponsors'
import CardUserLatest from '../../components/cards/CardUserLatest'

// Material Core
import { Grid, Hidden, Button, Typography } from '@material-ui/core'

const Profiles = props => {
  const { profiles } = props.profile
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    props.getProfiles()
  }, [])

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const location = 'getProfiles'

  return (
    <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
      <Hidden smDown>
        <Grid item xs={3}>
          <CardUserLatest profiles={profiles} />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" style={{ marginBottom: '10px' }}>
          Mitglieder ({profiles && profiles.length})
        </Typography>
        {profiles &&
          profiles.slice(0, limit)(profile => (
            <Grid item xs={12} key={profile._id}>
              <ProfilesCard location={location} profile={profile} />
            </Grid>
          ))}
        {profiles && profiles.slice(0, limit).length === profiles.length ? null : (
          <Button onClick={loadMore} variant="outlined" color="primary">
            Mehr...
          </Button>
        )}
      </Grid>
      <Hidden smDown>
        <Grid item xs={3}>
          <CardSponsors />
        </Grid>
      </Hidden>
    </Grid>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles)
