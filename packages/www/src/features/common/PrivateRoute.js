import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  if (auth.isAuthenticated && auth.user.isVerified) {
    return <Route {...rest} render={props => <Component {...props} />} />
  } else if (auth.isAuthenticated && !auth.user.isVerified) {
    return <Route {...rest} render={props => <Redirect to="/not-verified" />} />
  } else {
    return <Redirect to="/login" />
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
