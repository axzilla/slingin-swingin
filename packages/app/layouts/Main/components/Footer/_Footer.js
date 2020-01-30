import React from 'react'
import { Typography, Grid, Link as MuiLink } from '@material-ui/core'

function Footer() {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item style={{ margin: '20px' }}>
        <Typography>
          &copy; bounce.dev {new Date().getFullYear()} - made with{' '}
          <i className="fas fa-heart" style={{ color: 'red' }} />
        </Typography>
      </Grid>
      <div>
        <MuiLink color="inherit" href="mailto:mail@bounce.dev">
          <Typography style={{ display: 'inline', margin: '15px' }}>
            <i className="far fa-envelope-open fa-2x" />
          </Typography>
        </MuiLink>
      </div>
    </Grid>
  )
}

export default Footer
