import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

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
    <Typography className={classes.username} variant="h1" component="h3" align="center">
      <Box fontFamily="Monospace" fontWeight="bold">
        {profile.user.username}
      </Box>
    </Typography>
  )
}

ProfileDetailsUsername.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsUsername
