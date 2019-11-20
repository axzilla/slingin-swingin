import React, { useEffect, useContext } from 'react'
import Router from 'next/router'

import ReactGA from 'react-ga'
import isEmpty from '../../utils/isEmpty'
import AuthContext from '../../contexts/AuthContext'
import { useAlert } from '../../contexts/AlertContext'
import { sendVerificationEmail } from './_services'
import { getCurrentProfile } from '../profile/_services'
import { Grid, Typography, Card, CardContent, Button } from '@material-ui/core'

function NotVerified() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    getCurrentProfile()
  }, [])

  async function onSendMailClick(e) {
    e.preventDefault()
    await sendVerificationEmail(user)
    setAlert({ message: 'E-Mail erfolgreich gesendet' })
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
        </CardContent>
      </Card>
    </Grid>
  )
}

export default NotVerified
