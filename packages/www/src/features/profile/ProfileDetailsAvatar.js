// Packages
import React from 'react'

// Utils
import isEmpty from '../../utils/isEmpty'

// Assets
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Colors
import { grey } from '@material-ui/core/colors'

// Material Core
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

const ProfileDetailsAvatar = props => {
  const classes = useStyles()
  const { rgbaColor, profile } = props

  return (
    <Avatar
      style={{
        border: !isEmpty(profile.color) ? `3px ${rgbaColor} solid` : null
      }}
      className={classes.avatar}
      src={
        isEmpty(profile.user.avatar)
          ? avatarPlaceholder
          : profile.user.avatar.secure_url
      }
      alt="profile-avatar"
    />
  )
}

export default ProfileDetailsAvatar
