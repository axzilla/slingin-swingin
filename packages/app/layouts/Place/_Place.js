// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import Topbar from '@components/Topbar'
import Container from '@components/Container'

// Local Components
import Footer from './components/Footer'

// MUI
import Grid from '@material-ui/core/Grid'

function Place({ children }) {
  return (
    <Grid container>
      <Topbar />
      <Container maxWidth="lg">
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
      <Footer />
      {/* BottomNavigation hack */}
      <div style={{ height: '56px' }} />
    </Grid>
  )
}

Place.propTypes = {
  children: PropTypes.node
}

export default Place
