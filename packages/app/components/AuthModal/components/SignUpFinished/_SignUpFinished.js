// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Services
import { sendActivationEmail } from '@services/auth'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// MUI
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const SignUpFinished = ({ authData }) => {
  const { email } = authData
  const { setAlert } = useAlert()

  async function handleSendActivationEmail() {
    try {
      const response = await sendActivationEmail({ email })
      setAlert({ message: response.data.alertMessage, variant: 'success' })
    } catch (error) {
      console.log(error.response.data) // eslint-disable-line
    }
  }

  return (
    <>
      <Box mb={2}>
        <Typography gutterBottom>
          Please confirm your email address by clicking on the link we just emailed to{' '}
          <Box display="inline" fontWeight="bold">
            {email}
          </Box>
          .
        </Typography>
        <Typography>
          If you cannot find the email, you can request a new confirmation email.
        </Typography>
      </Box>
      <Box mb={2}>
        <Button
          onClick={handleSendActivationEmail}
          size="large"
          fullWidth
          type="submit"
          color="secondary"
          variant="contained"
        >
          Request E-Mail
        </Button>
      </Box>
    </>
  )
}

SignUpFinished.propTypes = {
  authData: PropTypes.object.isRequired
}

export default SignUpFinished
