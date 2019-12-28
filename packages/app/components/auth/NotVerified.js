import React, { useEffect, useContext } from 'react'

import AuthContext from '../../contexts/AuthContext'
import { sendVerificationEmail } from './_services'
import { getCurrentProfile } from '../profile/_services'
import { Grid, Typography, Card, CardContent, Button } from '@material-ui/core'

function NotVerified() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getCurrentProfile()
  }, [])

  function onSendMailClick(event) {
    event.preventDefault()
    sendVerificationEmail(user)
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
