// Packages
import React from 'react'
import PropTypes from 'prop-types'

// MUI
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  avatar: { height: ({ height }) => `${height}px`, width: ({ width }) => `${width}px` }
})

function UserAvatar({ user, height, width }) {
  const StyledBadge = withStyles(theme => ({
    badge: {
      backgroundColor: user.isOnline ? '#44b700' : 'red',
      color: user.isOnline ? '#44b700' : 'red',
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

  const classes = useStyles({ height, width })

  return (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      variant="dot"
    >
      <Avatar
        className={classes.avatar}
        alt={user.username.toUpperCase()}
        src={(user.avatar && user.avatar.secure_url) || '/broken-image.jpg'}
      />
    </StyledBadge>
  )
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
}

export default UserAvatar
