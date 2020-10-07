// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Local Components
import Avatar from './components/Avatar'
import Bio from './components/Bio'
import Infos from './components/Infos'
import Socials from './components/Socials'
import Username from './components/Username'

// MUI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function Header({ profile }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid>
          <Grid container alignItems="flex-start">
            <Grid item sm={3}>
              <Avatar profile={profile} />
            </Grid>
            <Grid item sm={9}>
              <Username profile={profile} />
              <Infos profile={profile} />
              <Bio profile={profile} />
              <Socials profile={profile} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

Header.propTypes = {
  profile: PropTypes.object
}

export default Header
