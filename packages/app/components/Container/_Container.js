import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import MuiContainer from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: ({ minHeight }) => minHeight && minHeight,
    maxHeight: ({ maxHeight }) => maxHeight && maxHeight,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    }
  }
}))

function Container({ minHeight, maxHeight, ...rest }) {
  const classes = useStyles({ minHeight, maxHeight })

  return <MuiContainer className={classes.root} {...rest} />
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string
}

export default Container
