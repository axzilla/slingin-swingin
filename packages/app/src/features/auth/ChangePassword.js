// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { changePassword } from './_services'

// Material Style
import { makeStyles } from '@material-ui/styles'

// Material Core
import {
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

const ChangePassword = ({ history }) => {
  const { auth } = useAuth()
  const classes = useStyles()

  const { errors } = auth

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: ''
  })

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
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
    const passwordData = {
      id: auth.user.id,
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
      newPassword2: passwords.newPassword2
    }

    changePassword(passwordData, history)
  }

  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">Passwort ändern</Typography>
          <form noValidate onSubmit={onSubmit}>
            <FormControl className={classes.formControl} error>
              <TextField
                type="password"
                error={errors.oldPassword ? true : false}
                placeholder="Altes Passwort"
                label="Altes Passwort"
                margin="normal"
                variant="outlined"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={onChange}
              />
              {errors.oldPassword ? (
                <FormHelperText className={classes.error}>{errors.oldPassword}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl className={classes.formControl} error>
              <TextField
                type="password"
                error={errors.newPassword ? true : false}
                placeholder="Neues Passwort"
                label="Neues Passwort"
                margin="normal"
                variant="outlined"
                name="newPassword"
                value={passwords.newPassword}
                onChange={onChange}
              />
              {errors.newPassword ? (
                <FormHelperText className={classes.error}>{errors.newPassword}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl className={classes.formControl} error>
              <TextField
                type="password"
                error={errors.newPassword2 ? true : false}
                placeholder="Neues Passwort wiederholen"
                label="Neues Passwort wiederholen"
                margin="normal"
                variant="outlined"
                name="newPassword2"
                value={passwords.newPassword2}
                onChange={onChange}
              />
              {errors.newPassword2 ? (
                <FormHelperText className={classes.error}>{errors.newPassword2}</FormHelperText>
              ) : null}
            </FormControl>
            <Button type="submit" variant="outlined" color="primary">
              Speichern
            </Button>
          </form>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

ChangePassword.propTypes = {
  history: PropTypes.object.isRequired
}

export default ChangePassword
