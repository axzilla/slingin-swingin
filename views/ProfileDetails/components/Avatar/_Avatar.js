import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  avatar: {
    maxWidth: '200px',
    height: 'auto',
    width: '100%',
    marginBottom: theme.spacing(2)
  }
}))

function ProfileDetailsAvatar({ profile }) {
  const classes = useStyles()

  return (
    <Grid container justify="center">
      {profile.user.avatar && profile.user.avatar.secure_url ? (
        <Avatar
          alt={profile.user.username}
          src={profile.user.avatar.secure_url}
          className={classes.avatar}
        />
      ) : (
        <Avatar alt={profile.user.username} className={classes.avatar}>
          {profile.user.username.substring(0, 1).toUpperCase()}
        </Avatar>
      )}
    </Grid>
  )
}

ProfileDetailsAvatar.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsAvatar
