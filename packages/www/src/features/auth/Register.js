// Packages
import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import { Link } from 'react-router-dom'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import {
  Typography,
  Grid,
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

const Register = ({ auth, history, registerUser }) => {
  const classes = useStyles()

  const { errors } = auth

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
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

  const onChange = e => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    const newUser = {
      username: registerData.username,
      email: registerData.email,
      password: registerData.password
    }

    registerUser(newUser, history)
  }

  return (
    <Grid className={classes.root} container justify="center">
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            @registrieren
          </Typography>
          <form onSubmit={onSubmit}>
            <FormControl className={classes.formControl} error>
              <TextField
                type="text"
                error={errors.username ? true : false}
                label="Benutzername"
                margin="normal"
                variant="outlined"
                name="username"
                value={registerData.username}
                onChange={onChange}
              />
              {errors.username ? (
                <FormHelperText className={classes.error}>
                  {errors.username}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl className={classes.formControl} error>
              <TextField
                type="email"
                error={errors.email ? true : false}
                label="E-Mail"
                margin="normal"
                variant="outlined"
                name="email"
                value={registerData.email}
                onChange={onChange}
              />
              {errors.email ? (
                <FormHelperText className={classes.error}>
                  {errors.email}
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
                value={registerData.password}
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
              className={classes.registerButton}
            >
              Registrieren
            </Button>
          </form>
          <Divider className={classes.divider} />
          <Link
            to={'/login'}
            style={{
              display: 'block',
              textDecoration: 'none'
            }}
          >
            <Button className={classes.passwordButton}>
              Du hast schon einen Account?
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Register
