import React, { useState, useEffect, useContext } from 'react'

import { usernameChange } from './_services'
import AuthContext from '../../contexts/AuthContext'
import { useAlert } from '../../contexts/AlertContext'

import { makeStyles } from '@material-ui/styles'

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

function UsernameChange() {
  const classes = useStyles()
  const { user, login } = useContext(AuthContext)
  const { setAlert } = useAlert()

  const [errors, setErrors] = useState()
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(user.username)
  }, [user.username])

  function onChange(event) {
    setUsername(event.target.value)
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const emailData = {
        id: user.id,
        username
      }
      const res = await usernameChange(emailData)
      const { token } = res.data
      login(token)
      setAlert({ message: 'Benutzername erfolgreich geändert' })
      localStorage.setItem('jwtToken', token)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">Benutzername ändern</Typography>
          <form noValidate onSubmit={onSubmit}>
            <FormControl className={classes.formControl} error>
              <TextField
                type="text"
                error={errors && errors.username ? true : false}
                placeholder="Benutzername"
                label="Benutzername"
                margin="normal"
                variant="outlined"
                name="username"
                value={username}
                onChange={onChange}
              />
              {errors && errors.username ? (
                <FormHelperText className={classes.error}>{errors.username}</FormHelperText>
              ) : null}
            </FormControl>
            <Button variant="outlined" color="primary" type="submit" className="register-button">
              Speichern
            </Button>
          </form>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default UsernameChange
