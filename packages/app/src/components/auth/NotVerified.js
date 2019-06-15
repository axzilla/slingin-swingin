import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import isEmpty from '../../utils/isEmpty'
import { useAuth } from '../../contexts/auth'
import { useAlert } from '../../contexts/alert'
import { sendVerificationEmail } from './_services'
import { getCurrentProfile } from '../profile/_services'
import { Grid, Typography, Card, CardContent, Button } from '@material-ui/core'

function NotVerified({ history }) {
  const { auth } = useAuth()
  const { setAlert } = useAlert()
  const { user } = auth

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    if (auth.user.isVerified || isEmpty(auth.user)) {
      history.push('/dashboard')
    }
    getCurrentProfile()
  }, [])

  async function onSendMailClick(e) {
    e.preventDefault()
    await sendVerificationEmail(auth.user)
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

NotVerified.propTypes = {
  history: PropTypes.object
}

export default NotVerified
