// Packages
import React from 'react'
import ReactGA from 'react-ga'

// Material Core
import { Card } from '@material-ui/core'

export default () => {
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
