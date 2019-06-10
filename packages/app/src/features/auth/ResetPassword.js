import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'
import ReactGA from 'react-ga'

import { useAuth } from '../../contexts/auth'
import { setNewPassword } from './_services'

import { makeStyles } from '@material-ui/styles'
import {
  Grid,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  TextField,
  Button
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

const ResetPassword = ({ history, match }) => {
  const { auth } = useAuth()
  const classes = useStyles()

  const { errors } = auth

  const [passwords, setPasswords] = useState({
    password: '',
    password2: ''
  })

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    if (auth.isAuthenticated) {
      history.push('/dashboard')
    }
  }, [])

  const onChange = e => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    const decode = jwtDecode(match.params.token)

    const passwordData = {
      id: decode.id,
      password: passwords.password,
      password2: passwords.password2
    }

    setNewPassword(passwordData, history)
  }

  return (
    <Grid className={classes.root} container justify="center">
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subtitle1">#passwortzuruecksetzen</Typography>
          <form onSubmit={onSubmit}>
            <FormControl className={classes.formControl} error>
              <TextField
                type="password"
                error={errors.password ? true : false}
                label="Passwort"
                margin="normal"
                variant="outlined"
                name="password"
                value={passwords.password}
                onChange={onChange}
              />
              {errors.password ? (
                <FormHelperText className={classes.error}>{errors.password}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl className={classes.formControl} error>
              <TextField
                type="password"
                error={errors.password ? true : false}
                label="Passwort wiederholen"
                margin="normal"
                variant="outlined"
                name="password2"
                value={passwords.password2}
                onChange={onChange}
              />
              {errors.password2 ? (
                <FormHelperText className={classes.error}>{errors.password2}</FormHelperText>
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
        </CardContent>
      </Card>
    </Grid>
  )
}

ResetPassword.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default ResetPassword
