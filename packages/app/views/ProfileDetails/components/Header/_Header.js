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
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function Header({ user }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item>
              <Avatar user={user} />
            </Grid>
            <Grid item md>
              <Box mb={4}>
                <Username user={user} />
              </Box>
              <Infos user={user} />
              <Bio user={user} />
              <Socials user={user} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

Header.propTypes = {
  user: PropTypes.object
}

export default Header
