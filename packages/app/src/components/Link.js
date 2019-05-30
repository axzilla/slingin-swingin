import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Link as RouterLink } from 'react-router-dom'
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

// const AdapterLink = React.forwardRef((props, ref) => (
//   <RouterLink innerRef={ref} {...props} />
// ))

// const CollisionLink = React.forwardRef((props, ref) => (
//   <RouterLink innerRef={ref} to="/getting-started/installation/" {...props} />
// ))

const CustomLink = ({ children, to }) => {
  const classes = useStyles()

  return (
    <Link component={RouterLink} to={to} className={classes.link}>
      {children}
    </Link>
  )
}

export default CustomLink
