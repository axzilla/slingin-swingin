// Packages
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { signInReducer } from '@slices/authSlice'

// Global Components
import TextField from '@components/TextField'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Services
import { passwordChange } from '@services/auth'

// Mui
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'

function Password() {
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const { currentUser } = useSelector(state => state.auth)

  const [errors, setErrors] = useState()
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: ''
  })

  function onChange(event) {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value
    })
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()
      const passwordData = {
        _id: currentUser._id,
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        newPassword2: passwords.newPassword2
      }

      const res = await passwordChange(passwordData)
      const { message, variant, token } = res.data
      dispatch(signInReducer(token))
      setAlert({ message, variant })
      setPasswords({
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      })
      setErrors('')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <Card variant="outlined">
      <CardHeader title="Password" />
      <Divider />
      <form noValidate onSubmit={onSubmit}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography color="textSecondary" gutterBottom>
                Current password
              </Typography>
              <TextField
                type="password"
                error={errors && errors.oldPassword}
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" gutterBottom>
                New password
              </Typography>
              <TextField
                type="password"
                error={errors && errors.newPassword}
                name="newPassword"
                value={passwords.newPassword}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" gutterBottom>
                Confirm password
              </Typography>
              <TextField
                type="password"
                error={errors && errors.newPassword2}
                name="newPassword2"
                value={passwords.newPassword2}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Button type="submit" variant="contained" color="secondary">
            Save
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}

export default Password
