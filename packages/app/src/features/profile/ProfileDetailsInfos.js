// Packages
import React from 'react'
import Moment from 'react-moment'

// Utils
import isEmpty from '../../utils/isEmpty'
// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  infoContainer: {
    marginBottom: '10px'
  },
  infoKey: {
    fontWeight: '300',
    fontFamily: 'Roboto Mono, monospace'
  },
  infoValue: {
    lineHeight: '20px',
    fontFamily: 'Roboto Mono, monospace'
  }
})

const ProfileDetailsInfos = props => {
  const classes = useStyles()

  const { profile } = props

  return (
    <Grid container>
      {isEmpty(profile.status) ? null : (
        <Grid item xs={12} sm={6} md={3} className={classes.infoContainer}>
          <Typography variant="subtitle1" className={classes.infoKey}>
            status
          </Typography>
          <Typography variant="subtitle1" className={classes.infoValue}>
            {profile.status}
          </Typography>
        </Grid>
      )}
      {isEmpty(profile.company) ? null : (
        <Grid item xs={12} sm={6} md={3} className={classes.infoContainer}>
          <Typography variant="subtitle1" className={classes.infoKey}>
            arbeitet bei
          </Typography>
          <Typography variant="subtitle1" className={classes.infoValue}>
            {profile.company}
          </Typography>
        </Grid>
      )}
      {isEmpty(profile.location) ? null : (
        <Grid item xs={12} sm={6} md={3} className={classes.infoContainer}>
          <Typography variant="subtitle1" className={classes.infoKey}>
            kommt aus
          </Typography>
          <Typography variant="subtitle1" className={classes.infoValue}>
            {profile.location}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} sm={6} md={3} className={classes.infoContainer}>
        <Typography variant="subtitle1" className={classes.infoKey}>
          beigetreten
        </Typography>
        <Typography variant="subtitle1" className={classes.infoValue}>
          <Moment fromNow locale="de">
            {profile.dateCreated}
          </Moment>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ProfileDetailsInfos
