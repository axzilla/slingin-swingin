import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
    userSelect: 'auto',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none'
    }
  }
})

function CustomLink({ children, to }) {
  const classes = useStyles()

  return (
    <Link component={RouterLink} to={to} className={classes.link}>
      {children}
    </Link>
  )
}

CustomLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
}

export default CustomLink
