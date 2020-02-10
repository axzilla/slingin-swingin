import React, { useState, useEffect, useContext } from 'react'

import AuthContext from '@contexts/AuthContext'
import { useAlert } from '@contexts/AlertContext'
import { settingsUpdate } from '@services/auth'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

function Settings() {
  const { user, login } = useContext(AuthContext)
  const { setAlert } = useAlert()

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

  function onChange(event) {
    setNotifications({
      ...notifications,
      [event.target.name]: !notifications[event.target.name]
    })
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()
      const res = await settingsUpdate(notifications)
      const { token } = res.data
      login(token)
      setAlert({ message: 'Email settings changed successfully' })
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader subheader="Change your email settings" />
        <form onSubmit={onSubmit}>
          <CardContent>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    name="onOwnPost"
                    checked={notifications.onOwnPost || false}
                    onChange={onChange}
                  />
                }
                label="For activities of your own post"
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    value={''}
                    name="onBookmarkedPost"
                    checked={notifications.onBookmarkedPost || false}
                    onChange={onChange}
                  />
                }
                label="For activities on a bookmarked post"
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    value={''}
                    name="onNewPost"
                    checked={notifications.onNewPost || false}
                    onChange={onChange}
                  />
                }
                label="When a new post is published"
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    value={''}
                    name="onCommentedPost"
                    checked={notifications.onCommentedPost || false}
                    onChange={onChange}
                  />
                }
                label="For posts where I left a comment"
              />
            </Grid>
          </CardContent>
          <CardContent>
            <Button type="submit" color="primary" variant="outlined">
              Save
            </Button>
          </CardContent>
        </form>
      </Card>
    </Grid>
  )
}

export default Settings
