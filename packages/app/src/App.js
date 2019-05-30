// Packages
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import ReactGA from 'react-ga'

// Utils
import setAuthToken from './utils/setAuthToken'

// Actions
import { setCurrentUser, logoutUser } from './features/auth/_actions'
import { clearCurrentProfile } from './features/profile/_actions'

// Store
import store from './store'

// Features
import PrivateRoute from './features/common/PrivateRoute'
import Layout from './features/layout/Layout'
import Landing from './features/layout/Landing'
import LoginContainer from './features/auth/container/LoginContainer'
import RegisterContainer from './features/auth/container/RegisterContainer'
import VerifyContainer from './features/auth/container/VerifyContainer'
import NotVerifiedContainer from './features/auth/container/NotVerifiedContainer'
import ForgotPasswordContainer from './features/auth/container/ForgotPasswordContainer'
import ResetPasswordContainer from './features/auth/container/ResetPasswordContainer'
import DashboardContainer from './features/dashboard/container/DashboardContainer'
import ProfileEdit from './features/profile/ProfileEdit'
import ProfileDetails from './features/profile/ProfileDetails'
import PostsByTag from './features/post/PostsByTag'
import PostCreate from './features/post/PostCreate'
import PostEdit from './features/post/PostEdit'
import PostDetails from './features/post/PostDetails'
import Search from './features/search/Search'
import NotFound from './features/not-found/NotFound'
import Imprint from './features/imprint/Imprint'
import PrivacyPolicy from './features/privacy/PrivacyPolicy'

// Assets
import './App.css'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwtDecode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    window.location.href = '/login'
  }
}

const App = props => {
  useEffect(() => {
    ReactGA.initialize('UA-128112231-2')
  }, [])

  const ScrollToTop = () => {
    window.scrollTo(0, 0)
    return null
  }

  return (
    <Provider store={store}>
      <Router>
        <Route component={ScrollToTop} />
        <Layout {...props}>
          <Switch>
            <PrivateRoute path="/dashboard" component={DashboardContainer} />
            <PrivateRoute exact path="/edit-profile" component={ProfileEdit} />
            <PrivateRoute exact path="/create-post" component={PostCreate} />
            <PrivateRoute exact path="/edit-post/:id" component={PostEdit} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/register" component={RegisterContainer} />
            <Route exact path="/verify/:token" component={VerifyContainer} />
            <Route
              exact
              path="/not-verified"
              component={NotVerifiedContainer}
            />
            <Route exact path="/login" component={LoginContainer} />
            <Route
              exact
              path="/forgot-password"
              component={ForgotPasswordContainer}
            />
            <Route
              exact
              path="/reset-password/:token"
              component={ResetPasswordContainer}
            />
            <Route
              exact
              path="/post/:postId/:urlSlug"
              component={PostDetails}
            />
            <Route exact path="/posts/t/:tag" component={PostsByTag} />
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/imprint" component={Imprint} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/:handle" component={ProfileDetails} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App
