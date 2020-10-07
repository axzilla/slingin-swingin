import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'

function Header({ tag }) {
  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Typography variant="h5" component="h1">
            t/{tag}
          </Typography>
        }
      />
    </Card>
  )
}

Header.propTypes = {
  tag: PropTypes.string
}

export default Header
