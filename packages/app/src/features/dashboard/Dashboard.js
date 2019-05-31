// Packages
import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ReactGA from 'react-ga'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { logoutUser } from '../auth/_services'
import {
  // getCurrentProfile,
  getProfilesByFollowingId,
  getProfilesByFollowerId
  // clearCurrentProfile
} from '../profile/_services'
import { getCommentsByUserId } from '../comment/_services'
import {
  getPostsByUserBookmark,
  getPostsByUserId,
  getDraftPostsByUserId
} from '../post/_services'

// Components
import Link from '../../components/Link'
import Spinner from '../common/Spinner'
import TabsPost from './TabsPost'
import TabsMember from './TabsMember'
import ProfileEdit from '../profile/ProfileEdit'
import DashboardSettings from './DashboardSettings'

// Material Core
import clsx from 'clsx'
import {
  Drawer,
  Grid,
  List,
  CssBaseline,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

// Material Styles
import { makeStyles } from '@material-ui/core/styles'

// Material Icons
import {
  ViewComfy,
  SupervisedUserCircle,
  AccountBox,
  Settings
} from '@material-ui/icons'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: 0
  },
  drawerOpen: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  },
  drawerClose: {
    [theme.breakpoints.down('sm')]: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

function MiniDrawer() {
  const classes = useStyles()
  const { auth } = useAuth()
  const [postsByUserId, setPostsByUserId] = useState()
  const [postsDraftsByUserId, setPostsDraftsByUserId] = useState()
  const [postsByUserBookmark, setPostsByUserBookmark] = useState()
  const [commentsByUserId, setCommentsByUserId] = useState()
  const [profilesByFollowerId, setProfilesByFollowerId] = useState()
  const [profilesByFollowingId, setProfilesByFollowingId] = useState()
  // const { loading, post, profile, comments }

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    // getCurrentProfile()
    getPostsByUserId(auth.user.id).then(res => {
      setPostsByUserId(res.data)
    })

    getDraftPostsByUserId(auth.user.id).then(res => {
      setPostsDraftsByUserId(res.data)
    })

    getPostsByUserBookmark(auth.user.id).then(res => {
      setPostsByUserBookmark(res.data)
    })

    getProfilesByFollowingId(auth.user.id).then(res => {
      setProfilesByFollowingId(res.data)
    })

    getProfilesByFollowerId(auth.user.id).then(res => {
      setProfilesByFollowerId(res.data)
    })

    getCommentsByUserId(auth.user.id).then(res => {
      setCommentsByUserId(res.data)
    })
  }, [])

  let dashboardContent

  if (
    postsByUserId === null ||
    postsDraftsByUserId === null ||
    postsByUserBookmark === null ||
    profilesByFollowingId === null ||
    profilesByFollowerId === null ||
    commentsByUserId === null
    // profile === null ||
    // profile.currentProfile === null ||
    // loading
  ) {
    dashboardContent = <Spinner />
  } else {
    dashboardContent = (
      <Switch>
        <Route
          exact
          path="/dashboard"
          render={() => <Redirect to="/dashboard/posts" />}
        />
        <Route
          exact
          path="/dashboard/posts"
          render={() => (
            <TabsPost
              postsByUserId={postsByUserId}
              postsDraftsByUserId={postsDraftsByUserId}
              postsByUserBookmark={postsByUserBookmark}
              commentsByUserId={commentsByUserId}
              currentUserId={auth.user.id}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/member"
          render={() => (
            <TabsMember
              profilesByFollowerId={profilesByFollowerId}
              profilesByFollowingId={profilesByFollowingId}
              currentUserId={auth.user.id}
            />
          )}
        />
        <Route exact path="/dashboard/profile" render={() => <ProfileEdit />} />
        <Route
          exact
          path="/dashboard/settings"
          render={() => <DashboardSettings />}
        />
      </Switch>
    )
  }

  return (
    <Grid container>
      <Grid item xs className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(
            classes.drawer,
            classes.drawerOpen,
            classes.drawerClose
          )}
          classes={{
            paper: clsx(classes.drawerOpen, classes.drawerClose)
          }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <Link to="/dashboard/posts">
              <ListItem button>
                <ListItemIcon>
                  <ViewComfy />
                </ListItemIcon>
                <ListItemText>Beiträge</ListItemText>
              </ListItem>
            </Link>
            <Link to="/dashboard/member">
              <ListItem button>
                <ListItemIcon>
                  <SupervisedUserCircle />
                </ListItemIcon>
                <ListItemText>Mitglieder</ListItemText>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/dashboard/profile">
              <ListItem button>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText>Profil</ListItemText>
              </ListItem>
            </Link>
            <Link to="/dashboard/settings">
              <ListItem button>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText>Einstellungen</ListItemText>
              </ListItem>
            </Link>
          </List>
        </Drawer>
        {dashboardContent}
      </Grid>
    </Grid>
  )
}

export default MiniDrawer
