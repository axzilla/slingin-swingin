// Packages
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// Services
import { userRegister } from '@services/auth'

// Global Components
import TextField from '@components/TextField'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  hover: { cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }
})

const SignUp = ({ errors, setErrors, resetErrors, authData, setAuthData, setType }) => {
  const classes = useStyles()

  useEffect(() => {
    return () => {
      resetErrors()
    }
  }, [])

  function handleChange(event) {
    setAuthData({ ...authData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      const { email, username, password, password2 } = authData
      await userRegister({ email, username, password, password2 })
      setType('SignUpFinished')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom>Username</Typography>
              <TextField
                error={errors && errors.username}
                type="username"
                name="username"
                value={authData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>E-Mail</Typography>
              <TextField
                error={errors && errors.email}
                type="email"
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
            Get Started
          </Button>
        </Box>
      </form>
      <Box mb={2}>
        <Typography className={classes.hover} variant="body2" onClick={() => setType('SignIn')}>
          You already have an account?
        </Typography>
      </Box>
    </>
  )
}

SignUp.propTypes = {
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  authData: PropTypes.object.isRequired,
  setAuthData: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired
}

export default SignUp
