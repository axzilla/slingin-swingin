import React, { useState } from 'react'
import jwtDecode from 'jwt-decode'

import { useAuth } from '../../contexts/auth'
import { useAlert } from '../../contexts/alert'
import { updateSettings } from './_services'

import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'

function Settings() {
  const { auth, setAuth } = useAuth()
  const { setAlert } = useAlert()

  const { onNewPost, onOwnPost, onBookmarkedPost, onCommentedPost } = auth.user.notifications

  const [notifications, setNotifications] = useState({
    onNewPost,
    onOwnPost,
    onBookmarkedPost,
    onCommentedPost
  })

  function onChange(e) {
    setNotifications({
      ...notifications,
      [e.target.name]: !notifications[e.target.name]
    })
  }

  async function onSubmit(e) {
    e.preventDefault()

    const res = await updateSettings(notifications)
    const { token } = res.data
    const decoded = jwtDecode(token)
    setAuth({ isAuthenticated: true, user: decoded })
    setAlert({ message: 'E-Mail Einstellungen erfolgreich geändert' })
    localStorage.setItem('jwtToken', token)
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">E-Mail Einstellungen</Typography>
          <form onSubmit={onSubmit}>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    name="onOwnPost"
                    checked={notifications.onOwnPost}
                    onChange={onChange}
                  />
                }
                label="Bei Aktivitäten eines eigenen Beitrags"
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    name="onBookmarkedPost"
                    checked={notifications.onBookmarkedPost}
                    onChange={onChange}
                  />
                }
                label="Bei Aktivitäten eines gebookmarkten Beitrags"
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    name="onNewPost"
                    checked={notifications.onNewPost}
                    onChange={onChange}
                  />
                }
                label="Wenn ein neuer Beitrag veröffentlicht wird"
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    name="onCommentedPost"
                    checked={notifications.onCommentedPost}
                    onChange={onChange}
                  />
                }
                label="Bei Beiträgen bei denen ich einen Kommentar hinterlassen habe"
              />
            </Grid>
            <Button type="submit" color="primary" variant="outlined">
              Speichern
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Settings
