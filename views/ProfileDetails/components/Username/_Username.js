import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  username: {
    textTransform: 'uppercase'
  }
})

function ProfileDetailsUsername({ profile }) {
  const classes = useStyles()

  return (
    <Typography className={classes.username} gutterBottom variant="h1" component="h3">
      <Box fontWeight={100} fontFamily="Monospace">
        {profile.user.username}
      </Box>
    </Typography>
  )
}

ProfileDetailsUsername.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsUsername
