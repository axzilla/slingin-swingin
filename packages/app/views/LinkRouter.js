import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'next/link'

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

function LinkRouter({ children, href }) {
  const classes = useStyles()

  return (
    <Link component={RouterLink} href={href} className={classes.link}>
      {children}
    </Link>
  )
}

LinkRouter.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
}

export default LinkRouter
