// Packages
import React from 'react'

// Utils
import isEmpty from '../../utils/isEmpty'

// Assets
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

// Actions
import { uploadAvatar, deleteAvatar } from '../auth/_services'

// Material Core
import { CircularProgress, Button, Typography, Avatar, Grid } from '@material-ui/core'

const ProfileEditAvatar = props => {
  const onChange = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('avatar', e.target.files[0])

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    props.uploadAvatar(formData, config)
  }

  const onDeleteAvatarClick = e => {
    e.preventDefault()
    if (window.confirm('Profilbild löschen?')) {
      props.deleteAvatar()
    }
  }

  return (
    <Grid container direction="column" alignItems="center">
      {props.isLoading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <Avatar
          style={{ height: '150px', width: '150px' }}
          src={
            isEmpty(props.auth.user.avatar) ? avatarPlaceholder : props.auth.user.avatar.secure_url
          }
          alt="user-avatar"
        />
      )}
      <Typography>*max 10MB</Typography>
      <input onChange={onChange} style={{ display: 'none' }} id="raised-button-file" type="file" />
      <Grid className="icons">
        <label htmlFor="raised-button-file">
          <Button disableRipple component="span">
            <i className="far fa-edit fa-lg icon" />
          </Button>
        </label>
        <Button
          disabled={props.isLoading}
          disableRipple
          style={{
            display: isEmpty(props.auth.user.avatar) ? 'none' : 'inline'
          }}
          onClick={onDeleteAvatarClick}
        >
          <i className="fas fa-trash-alt fa-lg icon" />
        </Button>
      </Grid>
    </Grid>
  )
}

export default ProfileEditAvatar
