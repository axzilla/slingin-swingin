// Packages
import React from 'react'
import PropTypes from 'prop-types'

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

function SignIn({ handleSignIn, handleChange, errors, authData, handleSetType }) {
  const classes = useStyles()

  return (
    <>
      <form onSubmit={handleSignIn} style={{ width: '100%' }}>
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
          onClick={() => handleSetType('ForgotPassword')}
        >
          Forgot password?
        </Typography>
        <Typography
          className={classes.hover}
          variant="body2"
          onClick={() => handleSetType('SignUp')}
        >
          Don’t have an account?
        </Typography>
      </Box>
    </>
  )
}

SignIn.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSignIn: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authData: PropTypes.object.isRequired,
  handleSetType: PropTypes.func.isRequired
}

export default SignIn
