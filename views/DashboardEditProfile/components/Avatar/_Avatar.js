import React, { useContext, useState } from 'react'

import isEmpty from '@utils/isEmpty'
import { avatarUpload, avatarDelete } from '@services/auth'
import AuthContext from '@contexts/AuthContext'

import Modal from './components/Modal'

import { makeStyles } from '@material-ui/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({ avatar: { height: '150px', width: '150px' } })

function ProfileEditAvatar() {
  const classes = useStyles()
  const [avatarOpen, setAvatarOpen] = React.useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user, login } = useContext(AuthContext)

  async function handleAvatarChange(event) {
    try {
      event.preventDefault()
      setIsLoading(true)

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
      setIsLoading(false)
    } catch (error) {
      if (error) throw error
    }
  }

  async function handleAvatarDelete(event) {
    try {
      event.preventDefault()
      setIsLoading(true)

      const res = await avatarDelete()
      const { token } = res.data
      login(token)

      setAvatarOpen(false)
      setIsLoading(false)
    } catch (error) {
      if (error) throw error
    }
  }

  const handleAvatarOpen = () => {
    setAvatarOpen(true)
  }

  return (
    <>
      <Card>
        <Grid container direction="column" alignItems="center">
          <CardContent>
            {user.avatar && user.avatar.secure_url ? (
              <Avatar className={classes.avatar} alt={user.username} src={user.avatar.secure_url} />
            ) : (
              <Avatar className={classes.avatar} alt={user.username}>
                {user.username && user.username.substring(0, 1)}
              </Avatar>
            )}
            <input
              disabled={isLoading}
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
            />
          </CardContent>
          <CardContent>
            <Grid container>
              <label
                style={{ display: !isEmpty(user.avatar) ? 'none' : 'inline', width: '100%' }}
                htmlFor="raised-button-file"
              >
                <Button fullWidth component="span" disabled={isLoading}>
                  Upload picture
                </Button>
              </label>
              <Button
                fullWidth
                style={{ display: isEmpty(user.avatar) ? 'none' : 'inline' }}
                onClick={handleAvatarOpen}
                disabled={isLoading}
              >
                Remove picture
              </Button>
            </Grid>
          </CardContent>
        </Grid>
        {isLoading && <LinearProgress color="secondary" />}
      </Card>
      <Modal
        avatarOpen={avatarOpen}
        setAvatarOpen={setAvatarOpen}
        handleAvatarDelete={handleAvatarDelete}
      />
    </>
  )
}

export default ProfileEditAvatar
