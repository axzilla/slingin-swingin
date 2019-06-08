import React from 'react'
import ReactGA from 'react-ga'

import { Card } from '@material-ui/core'

function NotFound() {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  return (
    <React.Fragment>
      <Card danger>
        <p>Sorry, die Seite wurde nicht gefunden...</p>
      </Card>
    </React.Fragment>
  )
}

export default NotFound
