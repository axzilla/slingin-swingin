// Packages
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// MUI
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  avatar: { height: ({ height }) => `${height}px`, width: ({ width }) => `${width}px` }
})

function UserAvatar({ user, height, width, hideOnlineStatus }) {
  const classes = useStyles({ height, width })
  const { users } = useSelector(state => state.onlineUsers)
  const { isAuthenticated } = useSelector(state => state.auth)

  const StyledBadge = withStyles(theme => ({
    badge: {
      backgroundColor: users.includes(user._id) ? '#44b700' : 'red',
      color: users.includes(user._id) ? '#44b700' : 'red',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid currentColor',
        content: '""'
      }
    }
  }))(Badge)

  return (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      variant="dot"
      invisible={!isAuthenticated || hideOnlineStatus} // Implement this prop later
    >
      <Avatar
        className={classes.avatar}
        alt={user.username.toUpperCase()}
        src={user.avatar && user.avatar.secure_url}
      />
    </StyledBadge>
  )
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  hideOnlineStatus: PropTypes.bool
}

export default UserAvatar
