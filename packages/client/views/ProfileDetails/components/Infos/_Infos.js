import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import isEmpty from '@utils/isEmpty'

import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import LocationCityIcon from '@material-ui/icons/LocationCity'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const useStyles = makeStyles(theme => ({
  infoIcons: {
    marginRight: theme.spacing(2)
  }
}))

function ProfileDetailsInfos({ profile }) {
  const classes = useStyles()

  return (
    <Box fontFamily="Monospace" mb={2}>
      {isEmpty(profile.firstName || profile.lastName) ? null : (
        <Grid container alignItems="center">
          <AccountCircleIcon className={classes.infoIcons} />
          <Typography variant="body1">
            {profile.firstName} {profile.lastName}
          </Typography>
        </Grid>
      )}
      {isEmpty(profile.status) ? null : (
        <Grid container alignItems="center">
          <MusicNoteIcon className={classes.infoIcons} />
          <Typography variant="body1">{profile.status}</Typography>
        </Grid>
      )}
      {isEmpty(profile.location) ? null : (
        <Grid container alignItems="center">
          <LocationCityIcon className={classes.infoIcons} />
          <Typography variant="body1">{profile.location}</Typography>
        </Grid>
      )}

      <Grid container alignItems="center">
        <PersonAddIcon className={classes.infoIcons} />
        <Typography variant="body1">
          <Moment fromNow>{profile.dateCreated}</Moment>
        </Typography>
      </Grid>
    </Box>
  )
}

ProfileDetailsInfos.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsInfos
