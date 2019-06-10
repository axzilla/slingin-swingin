import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import ReactGA from 'react-ga'

import { useAuth } from '../../contexts/auth'
import { changeEmail } from './_services'

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

const ChangeEmail = () => {
  const classes = useStyles()
  const { auth, setAuth } = useAuth()
  const { errors } = auth

  const [email, setEmail] = useState(auth.user.email)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
  }, [])

  const onChange = e => {
    setEmail(e.target.value)
  }

  const onSubmit = async e => {
    e.preventDefault()

    const emailData = {
      id: auth.user.id,
      email
    }

    try {
      const res = await changeEmail(emailData)
      const { token } = res.data
      const decoded = jwtDecode(token)
      setAuth({ isAuthenticated: true, user: decoded })
      localStorage.setItem('jwtToken', token)
    } catch (err) {
      setAuth({ ...auth, errors: err.response.data })
    }
  }

  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">E-Mail ändern</Typography>
          <form noValidate onSubmit={onSubmit}>
            <FormControl className={classes.formControl} error>
              <TextField
                type="email"
                error={errors && errors.email ? true : false}
                placeholder="E-Mail Adress"
                label="E-Mail Adresse"
                margin="normal"
                variant="outlined"
                name="email"
                value={email}
                onChange={onChange}
              />
              {errors && errors.email ? (
                <FormHelperText className={classes.error}>{errors.email}</FormHelperText>
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

export default ChangeEmail
