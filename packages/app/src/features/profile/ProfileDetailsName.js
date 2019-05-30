// Packages
import React from 'react'

// Utils
import isEmpty from '../../utils/isEmpty'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  name: {
    fontWeight: '500',
    marginBottom: '-10px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  }
}))

const ProfileDetailsName = props => {
  const classes = useStyles()
  const { profile, rgbaColor } = props

  return (
    <Typography
      className={classes.name}
      variant="h2"
      style={{
        color: !isEmpty(profile.color) ? `${rgbaColor}` : null
      }}
    >
      {profile.name}
    </Typography>
  )
}

export default ProfileDetailsName
