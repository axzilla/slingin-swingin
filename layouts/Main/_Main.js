import React from 'react'
import PropTypes from 'prop-types'

import Footer from './components/Footer'
import Topbar from '../../components/Topbar'
import TopbarMixings from '../../components/TopbarMixings'

import Grid from '@material-ui/core/Grid'

function Main({ children }) {
  return (
    <Grid container>
      <Topbar />
      <TopbarMixings />
      {children}
      <Footer />
    </Grid>
  )
}

Main.propTypes = {
  children: PropTypes.node
}

export default Main
