import React, { useState, useContext } from 'react'
import Router from 'next/router'

import AuthContext from '../../contexts/AuthContext'
import { userLogin } from './_services'

import LinkRouter from '../LinkRouter'

import { makeStyles } from '@material-ui/styles'
import {
  Grid,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  TextField,
  Button,
  Divider
} from '@material-ui/core'

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
    <Grid className={classes.root} container justify="center">
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            @login
          </Typography>
          <form onSubmit={onSubmit}>
            <FormControl className={classes.formControl} error>
              <TextField
                type="text"
                error={errors && errors.login ? true : false}
                label="Benutzername oder E-Mail"
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
                label="Passwort"
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
              color="primary"
              variant="outlined"
              className={classes.loginButton}
            >
              Einloggen
            </Button>
          </form>
          <Divider className={classes.divider} />
          <LinkRouter href={'/forgot-password'}>
            <Button className={classes.passwordButton}>Passwort vergessen?</Button>
          </LinkRouter>
          <LinkRouter href={'/register'}>
            <Button className={classes.passwordButton}>Noch keinen Account?</Button>
          </LinkRouter>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default UserLogin
