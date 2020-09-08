import React, { useState } from 'react'

import { useAlert } from '@contexts/AlertContext'
import { passwordForgot } from '@services/auth'
import TextField from '@components/TextField'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

function PasswordForgot() {
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
      <Typography variant="h5" align="center" gutterBottom>
        Forgot password?
      </Typography>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <Box mb={2}>
          <TextField
            type="email"
            error={errors && errors.email}
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </Box>
        <Button fullWidth type="submit" color="secondary" variant="contained">
          Send email
        </Button>
      </form>
    </>
  )
}

export default PasswordForgot
