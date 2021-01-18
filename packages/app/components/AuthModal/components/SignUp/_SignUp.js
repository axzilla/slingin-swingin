// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Contexts
import { useAlert } from '@contexts/AlertContext'

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

const SignUp = ({ setType }) => {
  const classes = useStyles()
  const { setAlert } = useAlert()
  const [errors, setErrors] = useState('')

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    username: ''
  })

  function handleChange(event) {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      const response = await userRegister({ ...registerData })
      resetForm()
      resetErrors()
      setAlert({ message: response.data.alertMessage })
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  function resetForm() {
    setRegisterData({
      email: '',
      password: '',
      username: ''
    })
  }

  function resetErrors() {
    setErrors('')
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
                value={registerData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>E-Mail</Typography>
              <TextField
                error={errors && errors.email}
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Password</Typography>
              <TextField
                type="password"
                error={errors && errors.password}
                name="password"
                value={registerData.password}
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
  setType: PropTypes.func.isRequired
}

export default SignUp
