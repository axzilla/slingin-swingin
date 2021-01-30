// Packages
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { signInReducer } from '@slices/authSlice'

// Services
import { usernameChange } from '@services/auth'

// Components
import TextField from '@components/TextField'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Mui
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'

function Username() {
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const { currentUser } = useSelector(state => state.auth)

  const [errors, setErrors] = useState()
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(currentUser.username)
  }, [currentUser.username])

  function onChange(event) {
    setUsername(event.target.value)
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const emailData = {
        _id: currentUser._id,
        username
      }

      const res = await usernameChange(emailData)
      const { message, variant, token } = res.data

      dispatch(signInReducer(token))
      setAlert({ message, variant })
      setErrors('')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardHeader title="Username" />
        <Divider />
        <form noValidate onSubmit={onSubmit}>
          <CardContent>
            <TextField
              error={errors && errors.username}
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
            />
          </CardContent>
          <CardContent>
            <Button variant="contained" color="secondary" type="submit" className="register-button">
              Save
            </Button>
          </CardContent>
        </form>
      </Card>
    </React.Fragment>
  )
}

export default Username
