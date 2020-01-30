import React, { useState } from 'react'
import Router from 'next/router'

import { userRegister } from '../../services/auth'
import NextLink from '../../components/NextLink'
import TextField from '../../components/TextField'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Register = () => {
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
      Router.push('/login')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <Card style={{ maxWidth: '400px' }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Ready to sign up?
        </Typography>
        <form onSubmit={onSubmit}>
          <Box mb={2}>
            <TextField
              error={errors && errors.email}
              type="email"
              label="Email"
              name="email"
              value={registerData.email}
              onChange={onChange}
            />
            <TextField
              type="password"
              error={errors && errors.password}
              label="Password"
              name="password"
              value={registerData.password}
              onChange={onChange}
            />
          </Box>
          <Box mb={2}>
            <Button fullWidth type="submit" color="secondary" variant="contained">
              Sign Up
            </Button>
          </Box>
        </form>
        <NextLink href={'/login'}>
          <Typography align="center">You already have an account?</Typography>
        </NextLink>
      </CardContent>
    </Card>
  )
}

export default Register
