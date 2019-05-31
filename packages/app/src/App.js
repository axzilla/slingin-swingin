// Packages
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactGA from 'react-ga'

// Store
import store from './store'

// Features
import PrivateRoute from './features/common/PrivateRoute'
import Layout from './features/layout/Layout'
import Landing from './features/layout/Landing'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Verify from './features/auth/Verify'
import NotVerified from './features/auth/NotVerified'
import ForgotPassword from './features/auth/ForgotPassword'
import ResetPassword from './features/auth/ResetPassword'
import Dashboard from './features/dashboard/Dashboard'
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

ReactGA.initialize('UA-128112231-2')

const ScrollToTop = () => {
  window.scrollTo(0, 0)
  return null
}

const App = props => {
  return (
    <Provider store={store}>
      <Router>
        <Route component={ScrollToTop} />

        <Layout {...props}>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/edit-profile" component={ProfileEdit} />
            <PrivateRoute exact path="/create-post" component={PostCreate} />
            <PrivateRoute exact path="/edit-post/:id" component={PostEdit} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/verify/:token" component={Verify} />
            <Route exact path="/not-verified" component={NotVerified} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
              exact
              path="/reset-password/:token"
              component={ResetPassword}
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
