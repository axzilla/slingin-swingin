import React, { useState } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

import { useAlert } from '@contexts/AlertContext'
import { passwordReset } from '@services/auth'
import TextField from '@components/TextField'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

function PasswordReset({ resetPasswordToken }) {
  const { setAlert } = useAlert()
  const [errors, setErrors] = useState('')

  const [passwords, setPasswords] = useState({
    password: '',
    password2: ''
  })

  function onChange(event) {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value
    })
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const passwordData = {
        resetPasswordToken,
        password: passwords.password,
        password2: passwords.password2
      }

      await passwordReset(passwordData)
      setAlert({ message: 'Email sent successfully' })
      Router.push('/')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Reset password?
      </Typography>
      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <TextField
            type="password"
            error={errors && errors.password}
            placeholder="Password"
            name="password"
            value={passwords.password}
            onChange={onChange}
          />
          <TextField
            type="password"
            error={errors && errors.password}
            placeholder="Repeat password"
            name="password2"
            value={passwords.password2}
            onChange={onChange}
          />
        </Box>
        <Button fullWidth type="submit" color="secondary" variant="contained">
          Login
        </Button>
      </form>
    </>
  )
}

PasswordReset.propTypes = {
  resetPasswordToken: PropTypes.string
}

export default PasswordReset
