import React from 'react'

import Link from '../../../../components/Link'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import MailIcon from '@material-ui/icons/Mail'

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
        <Link color="inherit" href="mailto:mail@bounce.dev">
          <Typography style={{ display: 'inline', margin: '15px' }}>
            <MailIcon />
          </Typography>
        </Link>
      </div>
    </Grid>
  )
}

export default Footer
