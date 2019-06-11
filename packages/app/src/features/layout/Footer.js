import React from 'react'
import Link from '../../components/Link'
import { Typography, Grid, Link as MuiLink } from '@material-ui/core'

function Footer() {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item style={{ margin: '20px' }}>
        <Typography>
          &copy; codehustla.io {new Date().getFullYear()} - mit{' '}
          <i className="fas fa-heart" style={{ color: 'red' }} /> gemacht
        </Typography>
      </Grid>
      <div>
        <MuiLink color="inherit" href="mailto:office@codehustla.io">
          <Typography style={{ display: 'inline', margin: '15px' }}>
            <i className="far fa-envelope-open fa-2x" />
          </Typography>
        </MuiLink>

        <MuiLink color="inherit" href="https://stackshare.io/codehustla/codehustla" target="blank">
          <Typography style={{ display: 'inline', margin: '15px' }}>
            <i className="fas fa-code-branch fa-2x" />
          </Typography>
        </MuiLink>

        <MuiLink color="inherit" href="https://www.instagram.com/codehustla.io/" target="blank">
          <Typography style={{ display: 'inline', margin: '15px' }}>
            <i className="fab fa-instagram fa-2x" />
          </Typography>
        </MuiLink>

        <MuiLink color="inherit" href="https://www.facebook.com/codehustla/" target="blank">
          <Typography style={{ display: 'inline', margin: '15px' }}>
            <i className="fab fa-facebook fa-2x" />
          </Typography>
        </MuiLink>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link to="/imprint">
          <Typography gutterBottom style={{ display: 'inline' }}>
            Impressum{' '}
          </Typography>
        </Link>
        <Typography gutterBottom style={{ display: 'inline' }}>
          &bull;{' '}
        </Typography>
        <Link to="/privacy-policy">
          <Typography gutterBottom style={{ display: 'inline' }}>
            Datenschutz
          </Typography>
        </Link>
      </div>
    </Grid>
  )
}

export default Footer
