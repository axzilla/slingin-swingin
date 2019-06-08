// Packages
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// Contexts
import { useAuth } from '../../contexts/auth'

function PrivateRoute({ component: Component, ...rest }) {
  const { auth } = useAuth()

  if (auth.isAuthenticated && auth.user.isVerified) {
    return <Route {...rest} render={props => <Component {...props} />} />
  } else if (auth.isAuthenticated && !auth.user.isVerified) {
    return <Route {...rest} render={() => <Redirect to="/not-verified" />} />
  } else {
    return <Redirect to="/login" />
  }
}

export default PrivateRoute
