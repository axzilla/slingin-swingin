// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import gravatar from 'gravatar'

// MUI
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: ({ isOnline }) => (isOnline ? '#44b700' : 'red'),
    color: ({ isOnline }) => (isOnline ? '#44b700' : 'red'),
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      // animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  }
  // '@keyframes ripple': {
  //   '0%': {
  //     transform: 'scale(.8)',
  //     opacity: 1
  //   },
  //   '100%': {
  //     transform: 'scale(2.4)',
  //     opacity: 0
  //   }
  // }
}))(Badge)

const useStyles = makeStyles({
  avatar: { height: ({ height }) => `${height}px`, width: ({ width }) => `${width}px` }
})

function UserAvatar({ user, height, width }) {
  const classes = useStyles({ height, width })
  const [gravatarImage, setGravatarImage] = useState()

  useState(() => {
    getGravatarImage()
  }, [])

  async function getGravatarImage() {
    const response = await gravatar.url(user.email, { d: '404' })
    setGravatarImage(response)
  }

  return (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      variant="dot"
      isOnline={user.isOnline}
    >
      {user.avatar && user.avatar.secure_url ? (
        <Avatar alt={user.username} src={user.avatar.secure_url} className={classes.avatar} />
      ) : gravatarImage ? (
        <Avatar alt={user.username} src={gravatarImage} className={classes.avatar} />
      ) : (
        <Avatar alt={user.username} className={classes.avatar}>
          {user.username.substring(0, 1).toUpperCase()}
        </Avatar>
      )}
    </StyledBadge>
  )
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
}

export default UserAvatar
