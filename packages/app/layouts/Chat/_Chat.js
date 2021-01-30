// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import Topbar from '@components/Topbar'
import BottomNavigationHack from '@components/BottomNavigationHack'

// MUI
import Grid from '@material-ui/core/Grid'

function Message({ children }) {
  return (
    <Grid container>
      <Topbar />
      {children}
      <BottomNavigationHack />
    </Grid>
  )
}

Message.propTypes = {
  children: PropTypes.node
}

export default Message
