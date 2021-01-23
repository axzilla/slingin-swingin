// Pckages
import React from 'react'
import PropTypes from 'prop-types'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Services
import { passwordForgot } from '@services/auth'

// Global Components
import TextField from '@components/TextField'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  hover: { cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }
})

function PasswordForgot({ errors, setErrors, authData, setAuthData, setType, handleClose }) {
  const classes = useStyles()
  const { setAlert } = useAlert()
  const { email } = authData

  function onChange(event) {
    setAuthData({ authData, [event.target.name]: event.target.value })
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()
      await passwordForgot({ email })
      setAlert({ message: 'Email sent successfully' })
      handleClose()
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <form noValidate onSubmit={onSubmit}>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom>E-Mail</Typography>
              <TextField
                type="email"
                error={errors && errors.email}
                name="email"
                value={authData.email}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Button size="large" fullWidth type="submit" color="secondary" variant="contained">
            Send link
          </Button>
        </Box>
      </form>
      <Box mb={2}>
        <Typography className={classes.hover} variant="body2" onClick={() => setType('SignIn')}>
          You already have an account?
        </Typography>
        <Typography className={classes.hover} variant="body2" onClick={() => setType('SignUp')}>
          Don’t have an account?
        </Typography>
      </Box>
    </>
  )
}

PasswordForgot.propTypes = {
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
  authData: PropTypes.object.isRequired,
  setAuthData: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default PasswordForgot
