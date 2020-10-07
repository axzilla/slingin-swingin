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
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'

function PasswordChange() {
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const { user } = useSelector(state => state.auth)

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
        id: user.id,
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        newPassword2: passwords.newPassword2
      }

      const res = await passwordChange(passwordData)
      const { token } = res.data
      dispatch(signInReducer(token))
      setAlert({ message: 'Password changed successfully' })
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
      <CardHeader subheader="Change your password" />
      <form noValidate onSubmit={onSubmit}>
        <CardContent>
          <TextField
            type="password"
            error={errors && errors.oldPassword}
            placeholder="Old password"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={onChange}
          />

          <TextField
            type="password"
            error={errors && errors.newPassword}
            placeholder="New password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={onChange}
          />

          <TextField
            type="password"
            error={errors && errors.newPassword2}
            placeholder="New password again"
            name="newPassword2"
            value={passwords.newPassword2}
            onChange={onChange}
          />
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

export default PasswordChange
