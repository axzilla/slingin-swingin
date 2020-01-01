import React from 'react'
import { Link } from '../../../../components'
import { Typography, Grid, Link as MuiLink } from '@material-ui/core'

function Footer() {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item style={{ margin: '20px' }}>
        <Typography>
          &copy; codehustla {new Date().getFullYear()} - mit{' '}
          <i className="fas fa-heart" style={{ color: 'red' }} /> gemacht
        </Typography>
      </Grid>
      <div>
        <MuiLink color="inherit" href="mailto:mail@codehustla.dev">
          <Typography style={{ display: 'inline', margin: '15px' }}>
            <i className="far fa-envelope-open fa-2x" />
          </Typography>
        </MuiLink>
        <MuiLink color="inherit" href="https://github.com/badazzdev/codehustla" target="blank">
          <Typography style={{ display: 'inline', margin: '15px' }}>
            <i className="fab fa-github fa-2x" />{' '}
          </Typography>
        </MuiLink>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link href="/imprint">
          <Typography gutterBottom style={{ display: 'inline' }}>
            Impressum{' '}
          </Typography>
        </Link>
        <Typography gutterBottom style={{ display: 'inline' }}>
          &bull;{' '}
        </Typography>
        <Link href="/privacy-policy">
          <Typography gutterBottom style={{ display: 'inline' }}>
            Datenschutz
          </Typography>
        </Link>
      </div>
    </Grid>
  )
}

export default Footer
