// Packages
import React from 'react'
import PropTypes from 'prop-types'

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

const SignUp = ({ handleChange, handleSignUp, errors, authData, handleSetType }) => {
  const classes = useStyles()

  return (
    <>
      <form noValidate onSubmit={handleSignUp}>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom>Name</Typography>
              <TextField
                error={errors && errors.name}
                name="name"
                value={authData.name}
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
            Sign up
          </Button>
        </Box>
      </form>
      <Box mb={2}>
        <Typography
          className={classes.hover}
          variant="body2"
          onClick={() => handleSetType('SignIn')}
        >
          You already have an account?
        </Typography>
      </Box>
    </>
  )
}

SignUp.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authData: PropTypes.object.isRequired,
  handleSetType: PropTypes.func.isRequired
}

export default SignUp
