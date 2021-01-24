// Pckages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import TextField from '@components/TextField'

// MUI
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

function PasswordForgot({ errors, authData, handleForgotPassword, handleChange }) {
  return (
    <>
      <form noValidate onSubmit={handleForgotPassword}>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom color="textSecondary">
                E-Mail
              </Typography>
              <TextField
                type="email"
                error={errors && errors.email}
                name="email"
                value={authData.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Button size="large" fullWidth type="submit" color="secondary" variant="contained">
            Send reset link
          </Button>
        </Box>
      </form>
    </>
  )
}

PasswordForgot.propTypes = {
  errors: PropTypes.object.isRequired,
  authData: PropTypes.object.isRequired,
  handleForgotPassword: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default PasswordForgot
