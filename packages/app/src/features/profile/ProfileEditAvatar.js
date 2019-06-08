import React from 'react'

import isEmpty from '../../utils/isEmpty'

import { useAuth } from '../../contexts/auth'

import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

import { uploadAvatar, deleteAvatar } from '../auth/_services'

import { Button, Typography, Avatar, Grid } from '@material-ui/core'

const ProfileEditAvatar = () => {
  const { auth } = useAuth()

  const onChange = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('avatar', e.target.files[0])

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    uploadAvatar(formData, config)
  }

  const onDeleteAvatarClick = e => {
    e.preventDefault()
    if (window.confirm('Profilbild löschen?')) {
      deleteAvatar()
    }
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Avatar
        style={{ height: '150px', width: '150px' }}
        src={isEmpty(auth.user.avatar) ? avatarPlaceholder : auth.user.avatar.secure_url}
        alt="user-avatar"
      />
      <Typography>*max 10MB</Typography>
      <input onChange={onChange} style={{ display: 'none' }} id="raised-button-file" type="file" />
      <Grid className="icons">
        <label htmlFor="raised-button-file">
          <Button disableRipple component="span">
            <i className="far fa-edit fa-lg icon" />
          </Button>
        </label>
        <Button
          disableRipple
          style={{
            display: isEmpty(auth.user.avatar) ? 'none' : 'inline'
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
