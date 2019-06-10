import React, { useState } from 'react'

import { useAuth } from '../../contexts/auth'
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

const Settings = () => {
  const { auth } = useAuth()

  const { onNewPost, onOwnPost, onBookmarkedPost, onCommentedPost } = auth.user.notifications

  const [notifications, setNotifications] = useState({
    onNewPost,
    onOwnPost,
    onBookmarkedPost,
    onCommentedPost
  })

  const onChange = e => {
    setNotifications({
      ...notifications,
      [e.target.name]: !notifications[e.target.name]
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    updateSettings(notifications)
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
