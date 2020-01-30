import React, { useState, useContext } from 'react'
import Router from 'next/router'

import AuthContext from '../../contexts/AuthContext'
import { userLogin } from '../../services/auth'
import NextLink from '../../components/NextLink'

import { makeStyles } from '@material-ui/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  formControl: {
    width: '100%'
  },
  card: {
    maxWidth: '400px'
  },
  error: {
    lineHeight: '20px',
    display: 'inline',
    margin: '0'
  },
  passwordButton: {
    fontSize: '10px'
  },
  loginButton: {
    margin: '20px 0'
  },
  divider: {
    marginBottom: '10px'
  }
})

function UserLogin() {
  const classes = useStyles()
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
    <>
      <form onSubmit={onSubmit}>
        <FormControl className={classes.formControl} error>
          <TextField
            type="text"
            error={errors && errors.login ? true : false}
            label="Username or email"
            margin="normal"
            variant="outlined"
            name="login"
            value={loginData.login}
            onChange={onChange}
          />
          {errors && errors.login ? (
            <FormHelperText className={classes.error}>{errors.login}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            type="password"
            error={errors && errors.password ? true : false}
            label="Password"
            margin="normal"
            variant="outlined"
            name="password"
            value={loginData.password}
            onChange={onChange}
          />
          {errors && errors.password ? (
            <FormHelperText className={classes.error}>{errors.password}</FormHelperText>
          ) : null}
        </FormControl>
        <Button
          fullWidth
          type="submit"
          color="secondary"
          variant="outlined"
          className={classes.loginButton}
        >
          Login
        </Button>
      </form>
      <NextLink href={'/forgot-password'}>
        <Button className={classes.passwordButton}>Forgot password?</Button>
      </NextLink>
      <NextLink href={'/register'}>
        <Button className={classes.passwordButton}>Don’t have an account? </Button>
      </NextLink>
    </>
  )
}

export default UserLogin
