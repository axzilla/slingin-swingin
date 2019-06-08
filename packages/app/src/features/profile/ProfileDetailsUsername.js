import React from 'react'
import PropTypes from 'prop-types'

import isEmpty from '../../utils/isEmpty'

import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  username: {
    fontFamily: 'Roboto Mono, monospace',
    fontWeight: '300',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  }
}))

const ProfileDetailsUsername = ({ profile, rgbaColor }) => {
  const classes = useStyles()

  return (
    <Typography
      gutterBottom
      className={classes.username}
      variant="h6"
      style={{
        color: !isEmpty(profile.color) ? `${rgbaColor}` : null
      }}
    >
      {profile.user.username}
    </Typography>
  )
}

ProfileDetailsUsername.propTypes = {
  profile: PropTypes.object.isRequired,
  rgbaColor: PropTypes.string.isRequired
}

export default ProfileDetailsUsername
