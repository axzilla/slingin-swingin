// Packages
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Utils
import isEmpty from '@utils/isEmpty'

// Redux
import { signInReducer } from '@slices/authSlice'

// Services
import { avatarUpload } from '@services/auth'
import { avatarDelete } from '@services/auth'

// Local Components
import Modal from './components/Modal'

// MUI
import { makeStyles } from '@material-ui/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({ avatar: { height: '150px', width: '150px' } })

function ProfileEditAvatar() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [avatarOpen, setAvatarOpen] = React.useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { currentUser } = useSelector(state => state.auth)

  async function handleAvatarChange(event) {
    try {
      event.preventDefault()
      setIsLoading(true)

      const formData = new FormData()
      formData.append('avatar', event.target.files[0])

      const config = { headers: { 'content-type': 'multipart/form-data' } }

      const res = await avatarUpload(formData, config)
      const { token } = res.data
      dispatch(signInReducer(token))

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
      dispatch(signInReducer(token))

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
      <Card variant="outlined">
        <Grid container direction="column" alignItems="center">
          <CardContent>
            {currentUser.avatar && currentUser.avatar.secure_url ? (
              <Avatar
                className={classes.avatar}
                alt={currentUser.username}
                src={currentUser.avatar.secure_url}
              />
            ) : (
              <Avatar className={classes.avatar} alt={currentUser.username}>
                {currentUser.username && currentUser.username.substring(0, 1)}
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
                style={{ display: !isEmpty(currentUser.avatar) ? 'none' : 'inline', width: '100%' }}
                htmlFor="raised-button-file"
              >
                <Button fullWidth component="span" disabled={isLoading}>
                  Upload picture
                </Button>
              </label>
              <Button
                fullWidth
                style={{ display: isEmpty(currentUser.avatar) ? 'none' : 'inline' }}
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
