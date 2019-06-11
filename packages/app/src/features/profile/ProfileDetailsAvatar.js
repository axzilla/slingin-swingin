import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from '../../utils/isEmpty'
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'
import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  avatar: {
    border: `3px solid ${grey[500]}`,
    maxWidth: '200px',
    maxHeight: '200px',
    width: 'auto',
    height: 'auto',
    marginRight: '20px',
    [theme.breakpoints.down('xs')]: {
      marginRight: '0',
      marginBottom: '20px'
    }
  }
}))

function ProfileDetailsAvatar({ rgbaColor, profile }) {
  const classes = useStyles()

  return (
    <Avatar
      style={{
        border: !isEmpty(profile.color) ? `3px ${rgbaColor} solid` : null
      }}
      className={classes.avatar}
      src={isEmpty(profile.user.avatar) ? avatarPlaceholder : profile.user.avatar.secure_url}
      alt="profile-avatar"
    />
  )
}

ProfileDetailsAvatar.propTypes = {
  rgbaColor: PropTypes.string,
  profile: PropTypes.object
}

export default ProfileDetailsAvatar
