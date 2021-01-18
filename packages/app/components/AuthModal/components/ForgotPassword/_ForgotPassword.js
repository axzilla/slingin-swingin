// Pckages
import React, { useState } from 'react'
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

function PasswordForgot({ setType }) {
  const classes = useStyles()
  const { setAlert } = useAlert()

  const [errors, setErrors] = useState('')
  const [email, setEmail] = useState('')

  function onChange(event) {
    setEmail(event.target.value)
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const emailData = { email }

      await passwordForgot(emailData)
      setAlert({ message: 'Email sent successfully' })
      setEmail('')
      setErrors('')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom>E-Mail</Typography>
              <TextField
                type="email"
                error={errors && errors.email}
                name="email"
                value={email}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Button fullWidth type="submit" color="secondary" variant="contained">
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
  setType: PropTypes.func.isRequired
}

export default PasswordForgot
