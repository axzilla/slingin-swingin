import React, { useState, useContext } from 'react'
import Router from 'next/router'

import AuthContext from '@contexts/AuthContext'
import { userRegister, userLogin } from '@services/auth'
import Link from '@components/Link'
import TextField from '@components/TextField'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Register = () => {
  const { login } = useContext(AuthContext)
  const [errors, setErrors] = useState('')

  const [registerData, setRegisterData] = useState({
    email: '',
    password: ''
  })

  const onChange = event => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = async event => {
    try {
      event.preventDefault()
      await userRegister({ ...registerData })

      const loggedInUser = await userLogin({
        login: registerData.email,
        password: registerData.password
      })

      const jwtToken = loggedInUser.data
      await login(jwtToken)

      Router.push('/dashboard/profile-edit')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Ready to get started?
      </Typography>
      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <TextField
            error={errors && errors.email}
            type="email"
            placeholder="Email"
            name="email"
            value={registerData.email}
            onChange={onChange}
          />
          <TextField
            type="password"
            error={errors && errors.password}
            placeholder="Password"
            name="password"
            value={registerData.password}
            onChange={onChange}
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
