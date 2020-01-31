import React from 'react'
import PropTypes from 'prop-types'

import Footer from './components/Footer'
import Topbar from '../../components/Topbar'
import TopbarMixings from '../../components/TopbarMixings'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

function Main({ children }) {
  return (
    <Grid container>
      <Topbar />
      <TopbarMixings />
      <Container>{children}</Container>
      <Footer />
    </Grid>
  )
}

Main.propTypes = {
  children: PropTypes.node
}

export default Main
