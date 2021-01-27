// Packages
import React from 'react'
import PropTypes from 'prop-types'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles({
  avatar: { height: ({ height }) => `${height}px`, width: ({ width }) => `${width}px` }
})

function UserAvatar({ user, height, width }) {
  const classes = useStyles({ height, width })

  return (
    <Avatar
      className={classes.avatar}
      alt={user.username.toUpperCase()}
      src={user.avatar && user.avatar.secure_url}
    />
  )
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
}

export default UserAvatar
