import React from 'react'
import PropTypes from 'prop-types'

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

function MuiLink({ children, href }) {
  const classes = useStyles()

  return (
    <Link className={classes.link} href={href}>
      {children}
    </Link>
  )
}

MuiLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
}

export default MuiLink
