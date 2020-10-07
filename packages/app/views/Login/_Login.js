// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { signInReducer } from '@slices/authSlice'

// Contexts
import { useAlert } from '@contexts/AlertContext'
import { useSocket } from '@contexts/SocketContext'

// Services
import { userLogin, sendActivationEmail, activateAccount } from '@services/auth'

// Global Components
import Link from '@components/Link'
import TextField from '@components/TextField'

// MUI
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

function UserLogin({ token }) {
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const { socket } = useSocket()
  const [errors, setErrors] = useState('')
  const { isAuthenticated } = useSelector(state => state.auth)

  const [loginData, setLoginData] = useState({
    login: '',
    password: ''
  })

  useEffect(() => {
    if (token) {
      handleActivateAccount()
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/')
    }
  }, [])

  function onChange(event) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      socket.close() // Close User Socket
      const loggedInUser = await userLogin(loginData)
      const jwtToken = loggedInUser.data
      dispatch(signInReducer(jwtToken))
      socket.open() // Open Guest Socket
      Router.push('/dashboard/profile-edit')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  async function handleSendActivationEmail() {
    try {
      const response = await sendActivationEmail({ login: loginData.login })
      setAlert({ message: response.data.alertMessage })
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  async function handleActivateAccount() {
    try {
      const response = await activateAccount({ token })
      setAlert({ message: response.data.alertMessage })
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Ready to log in?
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box mb={2}>
          <TextField
            error={errors && errors.login}
            placeholder="Username or email"
            name="login"
            value={loginData.login}
            onChange={onChange}
          />
          {errors.login &&
            errors.login ===
              'Account is not active. Please check your eMail inbox to activate your account or resend activation eMail' && (
              <Box mb={2}>
                <Button
                  fullWidth
                  onClick={handleSendActivationEmail}
                  color="primary"
                  variant="contained"
                >
                  Send activation eMail
                </Button>
              </Box>
            )}
          <TextField
            type="password"
            error={errors && errors.password}
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={onChange}
          />
        </Box>
        <Box mb={2}>
          <Button fullWidth type="submit" color="secondary" variant="contained">
            Login
          </Button>
        </Box>
      </form>
      <Link href={'/password-forgot'}>
        <Typography align="center">Forgot password?</Typography>
      </Link>
      <Link href={'/register'}>
        <Typography align="center">Don’t have an account? </Typography>
      </Link>
    </>
  )
}

UserLogin.propTypes = {
  token: PropTypes.string
}

export default UserLogin
