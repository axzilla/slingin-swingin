import React from 'react'
import PropTypes from 'prop-types'

import Topbar from '@components/Topbar'
import Footer from './components/Footer'

import Container from '@components/Container'
import WidgetLatestUsers from '@components/WidgetLatestUsers'
import WidgetTopPostsTags from '@components/WidgetTopPostsTags'

import Grid from '@material-ui/core/Grid'

function Main({ children }) {
  return (
    <Grid container>
      <Topbar />
      <Container maxWidth="lg">
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
          <Grid item xs={12} md={3}>
            <WidgetTopPostsTags />
          </Grid>
          <Grid item xs={12} md={6}>
            {children}
          </Grid>
          <Grid item xs={12} md={3}>
            <WidgetLatestUsers />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Grid>
  )
}

Main.propTypes = {
  children: PropTypes.node
}

export default Main
