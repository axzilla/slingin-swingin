import React from 'react'
import PropTypes from 'prop-types'

import Topbar from './components/Topbar'
import Footer from './components/Footer'

import Alert from '../../components/Alert'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

function Main({ children }) {
  return (
    <Container>
      <Grid container>
        <Topbar />
        {children}
        <Footer />
      </Grid>
      <Alert />
    </Container>
  )
}

Main.propTypes = {
  children: PropTypes.node
}

export default Main
