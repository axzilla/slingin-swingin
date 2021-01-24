// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import TextField from '@components/TextField'

// MUI
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

function ResetPassword({ handleResetPassword, handleChange, errors, authData }) {
  return (
    <>
      <form noValidate onSubmit={handleResetPassword}>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom color="textSecondary">
                Password
              </Typography>
              <TextField
                type="password"
                error={errors && errors.password}
                name="password"
                value={authData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom color="textSecondary">
                Re-enter password
              </Typography>
              <TextField
                type="password"
                error={errors && errors.password2}
                name="password2"
                value={authData.password2}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Button size="large" fullWidth type="submit" color="secondary" variant="contained">
            Reset Password
          </Button>
        </Box>
      </form>
    </>
  )
}

ResetPassword.propTypes = {
  handleResetPassword: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authData: PropTypes.object.isRequired
}

export default ResetPassword
