// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import Topbar from '@components/Topbar'
import Container from '@components/Container'
import Grid from '@material-ui/core/Grid'

function Message({ children }) {
  return (
    <Grid container>
      <Topbar />
      <Container minHeight={'calc(100vh - 70px)'} maxHeight={'calc(100vh - 70px)'} maxWidth="lg">
        {children}
      </Container>
    </Grid>
  )
}

Message.propTypes = {
  children: PropTypes.node
}

export default Message
