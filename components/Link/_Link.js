import React from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'

import { makeStyles } from '@material-ui/styles'
import MuiLink from '@material-ui/core/Link'

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: props => (props.underlined ? 'underlined' : 'none')
    }
  }
})

function Link({ underlined, ...rest }) {
  const classes = useStyles({ underlined })

  return (
    <NextLink {...rest}>
      <MuiLink className={classes.link} {...rest} />
    </NextLink>
  )
}

Link.propTypes = {
  underlined: PropTypes.bools
}

export default Link
