// Packages
import React from 'react'

// Utils
import isEmpty from '../../utils/isEmpty'

//  Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
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

const ProfileDetailsUsername = props => {
  const classes = useStyles()
  const { profile, rgbaColor } = props

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

export default ProfileDetailsUsername
