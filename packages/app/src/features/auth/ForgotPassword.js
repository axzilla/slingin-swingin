import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import { useAuth } from '../../contexts/auth'
import { forgotPassword } from './_services'

import { makeStyles } from '@material-ui/styles'
import {
  Typography,
  Grid,
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

const ForgotPassword = ({ history }) => {
  const { auth } = useAuth()
  const classes = useStyles()

  const { errors } = auth
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    if (auth.isAuthenticated) {
      history.push('/dashboard')
    }
  }, [])

  const onChange = e => {
    setEmail(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    const emailData = {
      email
    }

    forgotPassword(emailData)
    setEmail('')
  }

  return (
    <Grid className={classes.root} container justify="center">
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subtitle1">#passwortvergessen</Typography>
          <form onSubmit={onSubmit}>
            <FormControl className={classes.formControl} error>
              <TextField
                type="email"
                error={errors.email ? true : false}
                label="E-Mail"
                margin="normal"
                variant="outlined"
                name="email"
                value={email}
                onChange={onChange}
              />
              {errors.email ? (
                <FormHelperText className={classes.error}>{errors.email}</FormHelperText>
              ) : null}
            </FormControl>
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="outlined"
              className={classes.sendMailButton}
            >
              E-Mail senden
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

ForgotPassword.propTypes = {
  history: PropTypes.object.isRequired
}

export default ForgotPassword
