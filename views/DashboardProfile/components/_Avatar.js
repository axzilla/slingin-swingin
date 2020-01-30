import React, { useContext } from 'react'
import isEmpty from '../../../utils/isEmpty'
import { avatarUpload, avatarDelete } from '../../../services/auth'
import { Button, Typography, Avatar, Grid } from '@material-ui/core'

import AuthContext from '../../../contexts/AuthContext'

function ProfileEditAvatar() {
  const { user, login } = useContext(AuthContext)

  async function onChange(event) {
    try {
      event.preventDefault()

      const formData = new FormData()
      formData.append('avatar', event.target.files[0])

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

      const res = await avatarUpload(formData, config)
      const { token } = res.data
      login(token)
    } catch (error) {
      if (error) throw error
    }
  }

  async function onavatarDeleteClick(event) {
    try {
      event.preventDefault()
      if (window.confirm('Profilbild löschen?')) {
        const res = await avatarDelete()
        const { token } = res.data
        login(token)
      }
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Grid container direction="column" alignItems="center">
      {user.avatar && user.avatar.secure_url ? (
        <Avatar
          style={{ height: '150px', width: '150px' }}
          alt={user.username}
          src={user.avatar.secure_url}
        />
      ) : (
        <Avatar style={{ height: '150px', width: '150px' }} alt={user.username}>
          {user.username && user.username.substring(0, 1)}
        </Avatar>
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
          disableRipple
          style={{
            display: isEmpty(user.avatar) ? 'none' : 'inline'
          }}
          onClick={onavatarDeleteClick}
        >
          <i className="fas fa-trash-alt fa-lg icon" />
        </Button>
      </Grid>
    </Grid>
  )
}

export default ProfileEditAvatar
