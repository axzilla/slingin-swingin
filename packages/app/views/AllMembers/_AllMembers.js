// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import ProfileFeedItem from '@components/ProfileFeedItem'

// MUI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'

function AllMembers({ profiles }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardHeader
            title={
              <Typography variant="h5" component="h1">
                All Members
              </Typography>
            }
          />
        </Card>
      </Grid>
      {profiles.map(profile => (
        <Grid key={profile._id} item xs={12}>
          <ProfileFeedItem key={profile._id} profile={profile} />
        </Grid>
      ))}
    </Grid>
  )
}

AllMembers.propTypes = {
  profiles: PropTypes.array.isRequired
}

export default AllMembers
