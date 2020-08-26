import React, { useState } from 'react'

import { useAlert } from '@contexts/AlertContext'
import { userRegister } from '@services/auth'
import Link from '@components/Link'
import TextField from '@components/TextField'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Register = () => {
  const { setAlert } = useAlert()
  const [errors, setErrors] = useState('')

  const [registerData, setRegisterData] = useState({
    email: 'a',
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
      <Typography variant="h5" align="center" gutterBottom>
        Ready to get started?
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            error={errors && errors.username}
            type="username"
            placeholder="Username"
            name="username"
            value={registerData.username}
            onChange={handleChange}
          />
          <TextField
            error={errors && errors.email}
            type="email"
            placeholder="Email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
          />
          <TextField
            type="password"
            error={errors && errors.password}
            placeholder="Password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <Button fullWidth type="submit" color="secondary" variant="contained">
            Get Started
          </Button>
        </Box>
      </form>
      <Link href={'/login'}>
        <Typography align="center">You already have an account?</Typography>
      </Link>
    </>
  )
}

export default Register
