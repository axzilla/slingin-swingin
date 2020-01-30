import React, { useState, useContext } from 'react'
import Router from 'next/router'

import AuthContext from '../../contexts/AuthContext'
import { userLogin } from '../../services/auth'
import NextLink from '../../components/NextLink'
import TextField from '../../components/TextField'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

function UserLogin() {
  const { login } = useContext(AuthContext)
  const [errors, setErrors] = useState('')

  const [loginData, setLoginData] = useState({
    login: '',
    password: ''
  })

  function onChange(event) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    })
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()
      const loggedInUser = await userLogin({ ...loginData })
      const jwtToken = loggedInUser.data
      await login(jwtToken)
      Router.push('/')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <Card style={{ maxWidth: '400px' }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Ready to log in?
        </Typography>
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
          <Box mb={2}>
            <TextField
              error={errors && errors.login}
              label="Username or email"
              name="login"
              value={loginData.login}
              onChange={onChange}
            />
            <TextField
              type="password"
              error={errors && errors.password}
              label="Password"
              name="password"
              value={loginData.password}
              onChange={onChange}
            />
          </Box>
          <Box mb={2}>
            <Button fullWidth type="submit" color="secondary" variant="contained">
              Login
            </Button>
          </Box>
        </form>
        <NextLink href={'/forgot-password'}>
          <Typography align="center">Forgot password?</Typography>
        </NextLink>
        <NextLink href={'/register'}>
          <Typography align="center">Don’t have an account? </Typography>
        </NextLink>
      </CardContent>
    </Card>
  )
}

export default UserLogin
