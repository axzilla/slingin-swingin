import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import clsx from 'clsx'
import ReactGA from 'react-ga'

import { useAuth } from '../../contexts/auth'

import { getCommentsByUserId } from '../comment/_services'
import { getPostsByUserBookmark, getPostsByUserId } from '../post/_services'

import LinkRouter from '../../components/LinkRouter'
import Spinner from '../common/Spinner'
import TabsPost from './TabsPost'
import ProfileEdit from '../profile/ProfileEdit'
import DashboardSettings from './DashboardSettings'

import { makeStyles } from '@material-ui/core/styles'
import {
  Drawer,
  Grid,
  List,
  CssBaseline,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@material-ui/core'

import { ViewComfy, AccountBox, Settings } from '@material-ui/icons'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  avatar: {
    width: '24px',
    height: '24px'
  },
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

function Dashboard() {
  const classes = useStyles()
  const { auth } = useAuth()
  const [postsByUserId, setPostsByUserId] = useState()
  const [postsByUserBookmark, setPostsByUserBookmark] = useState()
  const [commentsByUserId, setCommentsByUserId] = useState()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    getPostsByUserId(auth.user.id).then(res => {
      setPostsByUserId(res.data)
    })

    getPostsByUserBookmark(auth.user.id).then(res => {
      setPostsByUserBookmark(res.data)
    })

    getCommentsByUserId(auth.user.id).then(res => {
      setCommentsByUserId(res.data)
    })
  }, [])

  let dashboardContent

  if (postsByUserId === null || postsByUserBookmark === null || commentsByUserId === null) {
    dashboardContent = <Spinner />
  } else {
    dashboardContent = (
      <Switch>
        <Route exact path="/dashboard" render={() => <Redirect to="/dashboard/posts" />} />
        <Route
          exact
          path="/dashboard/posts"
          render={() => (
            <TabsPost
              postsByUserId={postsByUserId}
              setPostsByUserId={setPostsByUserId}
              postsByUserBookmark={postsByUserBookmark}
              setPostsByUserBookmark={setPostsByUserBookmark}
              commentsByUserId={commentsByUserId}
              auth={auth}
            />
          )}
        />
        <Route exact path="/dashboard/profile" render={() => <ProfileEdit />} />
        <Route exact path="/dashboard/settings" render={() => <DashboardSettings />} />
      </Switch>
    )
  }

  return (
    <Grid container>
      <Grid item xs className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, classes.drawerOpen, classes.drawerClose)}
          classes={{
            paper: clsx(classes.drawerOpen, classes.drawerClose)
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <LinkRouter to={`/${auth.user.username}`}>
              <ListItem button>
                <ListItemIcon>
                  <Avatar src={auth.user.avatar.secure_url} className={classes.avatar} />
                </ListItemIcon>
                <ListItemText>@{auth.user.username}</ListItemText>
              </ListItem>
            </LinkRouter>
          </List>
          <Divider />
          <List>
            <LinkRouter to="/dashboard/posts">
              <ListItem button>
                <ListItemIcon>
                  <ViewComfy />
                </ListItemIcon>
                <ListItemText>Beiträge</ListItemText>
              </ListItem>
            </LinkRouter>
          </List>
          <Divider />
          <List>
            <LinkRouter to="/dashboard/profile">
              <ListItem button>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText>Profil</ListItemText>
              </ListItem>
            </LinkRouter>
            <LinkRouter to="/dashboard/settings">
              <ListItem button>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText>Einstellungen</ListItemText>
              </ListItem>
            </LinkRouter>
          </List>
        </Drawer>
        {dashboardContent}
      </Grid>
    </Grid>
  )
}

export default Dashboard
