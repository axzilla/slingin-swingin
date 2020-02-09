import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

function Header({ tag }) {
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h4" component="h1">
            t/{tag}
          </Typography>
        }
        avatar={<Avatar src="https://source.unsplash.com/featured/?music-studio" />}
      />
    </Card>
  )
}

Header.propTypes = {
  tag: PropTypes.string
}

export default Header
