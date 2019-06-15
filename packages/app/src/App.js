import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactGA from 'react-ga'
import PrivateRoute from './components/common/PrivateRoute'
import Layout from './components/layout/Layout'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Verify from './components/auth/Verify'
import NotVerified from './components/auth/NotVerified'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import Dashboard from './components/dashboard/Dashboard'
import ProfileEdit from './components/profile/ProfileEdit'
import ProfileDetails from './components/profile/ProfileDetails'
import PostsByTag from './components/post/PostsByTag'
import PostCreate from './components/post/PostCreate'
import PostEdit from './components/post/PostEdit'
import PostDetails from './components/post/PostDetails'
import Search from './components/search/Search'
import NotFound from './components/not-found/NotFound'
import Imprint from './components/imprint/Imprint'
import PrivacyPolicy from './components/privacy/PrivacyPolicy'

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID)

const ScrollToTop = () => {
  window.scrollTo(0, 0)
  return null
}

function App(props) {
  return (
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
          <Route exact path="/reset-password/:token" component={ResetPassword} />
          <Route exact path="/post/:postId/:urlSlug" component={PostDetails} />
          <Route exact path="/posts/t/:tag" component={PostsByTag} />
          <Route exact path="/not-found" component={NotFound} />
          <Route exact path="/imprint" component={Imprint} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/:handle" component={ProfileDetails} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
