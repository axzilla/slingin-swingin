// Packages
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Global Components
import TextField from '@components/TextField'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Services
import { emailChange } from '@services/auth'

// Redux
import { signInReducer } from '@slices/authSlice'

// MUI
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'

function Email() {
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const [errors, setErrors] = useState('')
  const [email, setEmail] = useState('')
  const { currentUser } = useSelector(state => state.auth)

  useEffect(() => {
    setEmail(currentUser.email)
  }, [currentUser.email])

  function onChange(event) {
    setEmail(event.target.value)
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const emailData = {
        _id: currentUser._id,
        email
      }

      const res = await emailChange(emailData)
      const { message, variant, token } = res.data
      dispatch(signInReducer(token))
      setAlert({ message, variant })
      setErrors('')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <Card variant="outlined">
      <CardHeader title="E-Mail" />
      <Divider />
      <form noValidate onSubmit={onSubmit}>
        <CardContent>
          <TextField
            type="email"
            error={errors && errors.email}
            placeholder="Email"
            name="email"
            value={email}
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

export default Email
