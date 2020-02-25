import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import isEmpty from '@utils/isEmpty'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function ProfileDetailsInfos({ profile }) {
  return (
    <Grid>
      {isEmpty(profile.status) ? null : (
        <Typography variant="h4">
          <Grid container>
            <Box fontFamily="Monospace" fontWeight="bold">
              Status:&nbsp;
            </Box>
            <Box fontFamily="Monospace">{profile.status}</Box>
          </Grid>
        </Typography>
      )}
      {isEmpty(profile.location) ? null : (
        <Typography variant="h4">
          <Grid container>
            <Box fontFamily="Monospace" fontWeight="bold">
              From:&nbsp;
            </Box>
            <Box fontFamily="Monospace">{profile.location}</Box>
          </Grid>
        </Typography>
      )}

      <Typography variant="h4">
        <Grid container>
          <Box fontFamily="Monospace" fontWeight="bold">
            Joined:&nbsp;
          </Box>
          <Box fontFamily="Monospace">
            <Moment fromNow>{profile.dateCreated}</Moment>
          </Box>
        </Grid>
      </Typography>
    </Grid>
  )
}

ProfileDetailsInfos.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsInfos
