import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import isEmpty from '@utils/isEmpty'

// import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

// import WorkIcon from '@material-ui/icons/Work'
// import LocationOnIcon from '@material-ui/icons/LocationOn'
// import LocationCityIcon from '@material-ui/icons/LocationCity'
// import AccountCircleIcon from '@material-ui/icons/AccountCircle'
// import PersonAddIcon from '@material-ui/icons/PersonAdd'

// const useStyles = makeStyles(theme => ({
//   infoIcons: {
//     marginRight: theme.spacing(2)
//   }
// }))

function ProfileDetailsInfos({ profile }) {
  // const classes = useStyles()

  return (
    <Box fontFamily="Monospace" mb={2}>
      {isEmpty(profile.name) ? null : (
        <Grid container alignItems="center">
          {/* <AccountCircleIcon color="action" className={classes.infoIcons} /> */}
          <Typography variant="body1">
            {'>'} {profile.name}
          </Typography>
        </Grid>
      )}
      {isEmpty(profile.status) ? null : (
        <Grid container alignItems="center">
          {/* <WorkIcon color="action" className={classes.infoIcons} /> */}
          <Typography variant="body1">
            {'>'} {profile.status}
          </Typography>
        </Grid>
      )}
      {isEmpty(profile.locationFrom) ? null : (
        <Grid container alignItems="center">
          {/* <LocationCityIcon color="action" className={classes.infoIcons} /> */}
          <Typography variant="body1">
            {'>'} From {profile.locationFrom.mapBox.place_name}
          </Typography>
        </Grid>
      )}
      {isEmpty(profile.locationCurrent) ? null : (
        <Grid container alignItems="center">
          {/* <LocationOnIcon color="action" className={classes.infoIcons} /> */}
          <Typography variant="body1">
            {'>'} Currently in {profile.locationCurrent.mapBox.place_name}
          </Typography>
        </Grid>
      )}

      <Grid container alignItems="center">
        {/* <PersonAddIcon color="action" className={classes.infoIcons} /> */}
        <Typography variant="body1">
          {'>'} Joined <Moment fromNow>{profile.dateCreated}</Moment>
        </Typography>
      </Grid>
    </Box>
  )
}

ProfileDetailsInfos.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsInfos
