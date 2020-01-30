import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { makeStyles } from '@material-ui/styles'
import { Link as MuiLink } from '@material-ui/core'

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

function NextLink({ children, href }) {
  const classes = useStyles()

  return (
    <Link href={href}>
      <MuiLink className={classes.link}>{children}</MuiLink>
    </Link>
  )
}

NextLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
}

export default NextLink
