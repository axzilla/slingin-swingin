import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import MuiContainer from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    }
  }
}))

function Container({ children }) {
  const classes = useStyles()

  return <MuiContainer className={classes.root}>{children}</MuiContainer>
}

Container.propTypes = { children: PropTypes.node.isRequired }

export default Container
