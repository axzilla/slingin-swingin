import React from 'react'
import PropTypes from 'prop-types'

import Sidebar from './components/Sidebar'

import Container from '@components/Container'
import Topbar from '@components/Topbar'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  root: { display: 'flex' }
})

function Dashboard({ children }) {
  const classes = useStyles()

  return (
    <>
      <Topbar />
      <Grid className={classes.root}>
        <Sidebar />
        <Container maxWidth="lg">{children}</Container>
      </Grid>
    </>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node
}

export default Dashboard
