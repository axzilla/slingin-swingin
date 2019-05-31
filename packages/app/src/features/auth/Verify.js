// Packages
import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import ReactGA from 'react-ga'

// Services
import { verifyUser } from './_services'

// Contexts
import { useAuth } from '../../contexts/auth'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Typography, Grid, Card, CardContent } from '@material-ui/core'

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
  sendMailButton: {
    margin: '20px 0'
  }
})

const Verify = ({ match }) => {
  const { auth } = useAuth()
  const classes = useStyles()
  const { errors } = auth

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    const decode = jwtDecode(match.params.token)
    verifyUser(decode)
  }, [])

  return (
    <Grid className={classes.root} container justify="center">
      <Card>
        <CardContent>
          <Typography variant="subtitle1">
            {errors.user ||
              errors.tokenExpired ||
              errors.alreadyVerified ||
              'Du hast deinen Account erfolgreich verifiziert.'}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Verify
