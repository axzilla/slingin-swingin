import React, { useState, useEffect, useContext } from 'react'

import AuthContext from '../../contexts/AuthContext'
import { useAlert } from '../../contexts/AlertContext'
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
  const { user, login } = useContext(AuthContext)
  const { setAlert } = useAlert()
  console.log(user)

  const [notifications, setNotifications] = useState({
    onNewPost: false,
    onOwnPost: false,
    onBookmarkedPost: false,
    onCommentedPost: false
  })

  useEffect(() => {
    setNotifications({
      onNewPost: user.notifications && user.notifications.onNewPost,
      onOwnPost: user.notifications && user.notifications.onOwnPost,
      onBookmarkedPost: user.notifications && user.notifications.onBookmarkedPost,
      onCommentedPost: user.notifications && user.notifications.onCommentedPost
    })
  }, [user.notifications])

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
    login(token)
    setAlert({ message: 'E-Mail Einstellungen erfolgreich geändert' })
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