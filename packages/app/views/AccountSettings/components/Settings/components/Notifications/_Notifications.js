// Packages
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { signInReducer } from '@slices/authSlice'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Services
import { settingsUpdate } from '@services/auth'

// MUI
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

function Settings() {
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const { user } = useSelector(state => state.auth)

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
      const { message, variant, token } = res.data
      dispatch(signInReducer(token))
      setAlert({ message, variant })
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardHeader title="Notifications" />
        <Divider />
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
            {/* <Grid>
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
            </Grid> */}
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
            <Button type="submit" color="secondary" variant="contained">
              Save
            </Button>
          </CardContent>
        </form>
      </Card>
    </Grid>
  )
}

export default Settings
