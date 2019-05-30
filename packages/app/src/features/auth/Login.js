// Packages
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
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

const Login = ({ auth, loginUser, history }) => {
  const classes = useStyles()

  const { errors } = auth

  const [loginData, setLoginData] = useState({
    login: '',
    password: ''
  })

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    if (auth.isAuthenticated) {
      history.push('/dashboard')
    }
  }, [])

  const onSubmit = e => {
    e.preventDefault()

    const userData = {
      login: loginData.login,
      password: loginData.password
    }

    loginUser(userData, history)
  }

  const onChange = e => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
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
                error={errors.login ? true : false}
                label="Benutzername oder E-Mail"
                margin="normal"
                variant="outlined"
                name="login"
                value={loginData.login}
                onChange={onChange}
              />
              {errors.login ? (
                <FormHelperText className={classes.error}>
                  {errors.login}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl className={classes.formControl} error>
              <TextField
                type="password"
                error={errors.password ? true : false}
                label="Passwort"
                margin="normal"
                variant="outlined"
                name="password"
                value={loginData.password}
                onChange={onChange}
              />
              {errors.password ? (
                <FormHelperText className={classes.error}>
                  {errors.password}
                </FormHelperText>
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
          <Link to={'/forgot-password'}>
            <Button className={classes.passwordButton}>
              Passwort vergessen?
            </Button>
          </Link>
          <Link to={'/register'}>
            <Button className={classes.passwordButton}>
              Noch keinen Account?
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Login
