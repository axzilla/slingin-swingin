import React from 'react'
import LinkRouter from '../../views/LinkRouter'
import { Grid, Typography, Button, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  body: {
    marginBottom: '20px'
  },
  checks: {
    fontWeight: '900',
    fontSize: '15px',
    marginBottom: '12px'
  },
  gridButtons: {
    marginBottom: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  }
}))

function CardLanding() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h1" variant="h5" gutterBottom>
          Gemeinsam werden wir bessere Entwickler
        </Typography>
        <Typography className={classes.body}>
          Codehustla wurde für dich entwickelt. Tausche dich im deutschsprachigem Raum mit anderen
          Entwicklern aus. Wir helfen uns gegenseitig um zu wachsen. Hustle, code and never quit.
          Melde dich jetzt kostenlos an und werde Teil einer genialen Community.
        </Typography>
        <Grid className={classes.gridButtons}>
          <LinkRouter href="/register">
            <Button className={classes.button} variant="outlined" color="secondary">
              Registrieren
            </Button>
          </LinkRouter>
          <LinkRouter href="/login">
            <Button className={classes.button} variant="outlined" color="primary">
              Einloggen
            </Button>
          </LinkRouter>
        </Grid>
        <Typography gutterBottom className={classes.checks}>
          <i className="fas fa-check-circle" style={{ color: '#38d3b6', marginRight: '10px' }} />{' '}
          Erstelle ein professionelles Developer Profil von dir
        </Typography>
        <Typography gutterBottom className={classes.checks}>
          <i className="fas fa-check-circle" style={{ color: '#38d3b6', marginRight: '10px' }} />{' '}
          Stelle Fragen und hole dir Hilfe bei Coding- und Programmierproblemen von der Community
        </Typography>
        <Typography gutterBottom className={classes.checks}>
          <i className="fas fa-check-circle" style={{ color: '#38d3b6', marginRight: '10px' }} />{' '}
          Schreibe Artikel oder erstelle Tutorials zu Coding- und Programmierthemen aller Art
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardLanding
