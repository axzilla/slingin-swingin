import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import isEmpty from '../../utils/isEmpty'
import { useAuth } from '../../contexts/auth'
import { sendVerificationEmail } from './_services'
import { getCurrentProfile } from '../profile/_services'

import { Grid, Typography, Card, CardContent, Button } from '@material-ui/core'

const NotVerified = ({ history }) => {
  const { auth } = useAuth()

  const { user } = auth
  const { alerts } = auth

  const [alert, setAlert] = useState({})

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    if (auth.user.isVerified || isEmpty(auth.user)) {
      history.push('/dashboard')
    }
    getCurrentProfile()
  }, [])

  useEffect(() => {
    setAlert(alerts)
  }, [alerts])

  const onSendMailClick = e => {
    e.preventDefault()
    sendVerificationEmail(auth.user)
  }

  const onLogoutClick = e => {
    e.preventDefault()
    if (window.confirm('Bist du sicher, dass du dich ausloggen möchtest?')) {
      // logoutUser()
      history.push('/login')
    }
  }

  return (
    <Grid>
      <Card style={{ textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h3" style={{ marginBottom: '20px' }}>
            @{user.username}
          </Typography>
          <Typography style={{ marginBottom: '10px' }}>
            Du hast deinen Account noch nicht verifiziert. Um deinen Account im vollen Umfang nutzen
            zu können, bestätige bitte deinen Account. Wir haben dir hierzu eine E-Mail geschickt.
            Bitte überprüfe deinen E-Mail Eingang.
          </Typography>
          <Typography style={{ marginBottom: '10px', fontWeight: '900' }}>
            Keine E-Mail erhalten?{' '}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={onSendMailClick}
            style={{ margin: '5px' }}
          >
            E-Mail senden
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={onLogoutClick}
            style={{ margin: '5px' }}
          >
            Ausloggen
          </Button>
        </CardContent>
      </Card>
      {/* <Alert
        isOpen={!isEmpty(alerts) ? true : false}
        status="success"
        alerts={alert}
        message={alerts}
      /> */}
    </Grid>
  )
}

NotVerified.propTypes = {
  history: PropTypes.object.isRequired
}

export default NotVerified
