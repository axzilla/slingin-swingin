// Packages
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

// Redux
import { signInReducer } from '@slices/authSlice'

// Contexts
import { useSocket } from '@contexts/SocketContext'

// Services
import { userLogin } from '@services/auth'

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

function SignIn({ errors, setErrors, authData, setAuthData, setType, handleClose }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { socket } = useSocket()

  useEffect(() => {
    if (errors.login === '!isActive') {
      setType('SignUpFinished')
    }
  }, [errors])

  function handleChange(event) {
    setAuthData({ ...authData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      const { email, password } = authData
      socket.close() // Close User Socket
      const loggedInUser = await userLogin({ email, password })
      const jwtToken = loggedInUser.data
      dispatch(signInReducer(jwtToken))
      socket.open() // Open Guest Socket
      handleClose()
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom>E-Mail</Typography>
              <TextField
                error={errors && errors.email}
                name="email"
                value={authData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Password</Typography>
              <TextField
                type="password"
                error={errors && errors.password}
                name="password"
                value={authData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Button size="large" fullWidth type="submit" color="secondary" variant="contained">
            Sign In
          </Button>
        </Box>
      </form>
      <Box mb={2}>
        <Typography
          className={classes.hover}
          variant="body2"
          onClick={() => setType('ForgotPassword')}
        >
          Forgot password?
        </Typography>
        <Typography className={classes.hover} variant="body2" onClick={() => setType('SignUp')}>
          Don’t have an account?
        </Typography>
      </Box>
    </>
  )
}

SignIn.propTypes = {
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
  authData: PropTypes.object.isRequired,
  setAuthData: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default SignIn
