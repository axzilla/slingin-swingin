import React, { useState } from 'react'
import Router from 'next/router'
import { userRegister } from '../../services/auth'
import LinkRouter from '../LinkRouter'

import { makeStyles } from '@material-ui/styles'

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

const Register = () => {
  const classes = useStyles()
  const [errors, setErrors] = useState('')

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const onChange = event => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = async event => {
    try {
      event.preventDefault()
      await userRegister({ ...registerData })
      Router.push('/login')
    } catch (error) {
      setErrors(error.response.data)
    }
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
                error={errors && errors.username ? true : false}
                label="Benutzername"
                margin="normal"
                variant="outlined"
                name="username"
                value={registerData.username}
                onChange={onChange}
              />
              {errors && errors.username ? (
                <FormHelperText className={classes.error}>{errors.username}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl className={classes.formControl} error>
              <TextField
                type="email"
                error={errors && errors.email ? true : false}
                label="E-Mail"
                margin="normal"
                variant="outlined"
                name="email"
                value={registerData.email}
                onChange={onChange}
              />
              {errors && errors.email ? (
                <FormHelperText className={classes.error}>{errors.email}</FormHelperText>
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
                value={registerData.password}
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
              className={classes.registerButton}
            >
              Registrieren
            </Button>
          </form>
          <Divider className={classes.divider} />
          <LinkRouter
            href={'/login'}
            style={{
              display: 'block',
              textDecoration: 'none'
            }}
          >
            <Button className={classes.passwordButton}>Du hast schon einen Account?</Button>
          </LinkRouter>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Register
