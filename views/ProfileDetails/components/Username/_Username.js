import React from 'react'
import PropTypes from 'prop-types'

import isEmpty from '@utils/isEmpty'

import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  username: {
    fontFamily: 'Roboto Mono, monospace',
    fontWeight: '300',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  }
}))

function ProfileDetailsUsername({ profile }) {
  const classes = useStyles()

  return (
    <Typography gutterBottom className={classes.username} variant="h6">
      {profile.user.username}
    </Typography>
  )
}

ProfileDetailsUsername.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsUsername
