// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

// Redux
import { signInReducer } from '@slices/authSlice'

// Contexts
import { useAlert } from '@contexts/AlertContext'
import { useSocket } from '@contexts/SocketContext'

// Services
import { userLogin, sendActivationEmail, activateAccount } from '@services/auth'

// Global Components
import TextField from '@components/TextField'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  hover: { cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }
})

function SignIn({ token, handleClose, setType }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const { socket } = useSocket()
  const [errors, setErrors] = useState('')

  const [loginData, setLoginData] = useState({
    login: '',
    password: ''
  })

  useEffect(() => {
    if (token) {
      handleActivateAccount()
    }
  }, [])

  function onChange(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      socket.close() // Close User Socket
      const loggedInUser = await userLogin(loginData)
      const jwtToken = loggedInUser.data
      dispatch(signInReducer(jwtToken))
      socket.open() // Open Guest Socket
      handleClose()
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
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom>Username or E-Mail</Typography>
              <TextField
                error={errors && errors.login}
                name="login"
                value={loginData.login}
                onChange={onChange}
              />
            </Grid>
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
            <Grid item xs={12}>
              <Typography gutterBottom>Password</Typography>
              <TextField
                type="password"
                error={errors && errors.password}
                name="password"
                value={loginData.password}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Button fullWidth type="submit" color="secondary" variant="contained">
            Login
          </Button>
        </Box>
      </form>
      <Typography
        className={classes.hover}
        variant="body2"
        display="block"
        onClick={() => setType('ForgotPassword')}
      >
        Forgot password?
      </Typography>
      <Typography
        className={classes.hover}
        variant="body2"
        display="block"
        onClick={() => setType('SignUp')}
      >
        Don’t have an account?
      </Typography>
    </>
  )
}

SignIn.propTypes = {
  token: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired
}

export default SignIn
