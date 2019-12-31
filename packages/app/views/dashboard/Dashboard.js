import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import AuthContext from '../../contexts/AuthContext'

import LinkRouter from '../../views/LinkRouter'

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

function Dashboard({ children }) {
  const classes = useStyles()
  const { user } = useContext(AuthContext)

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
            <LinkRouter href={`/${user.username}`}>
              <ListItem button>
                <ListItemIcon>
                  <Avatar src={user.avatar && user.avatar.secure_url} className={classes.avatar} />
                </ListItemIcon>
                <ListItemText>@{user.username}</ListItemText>
              </ListItem>
            </LinkRouter>
          </List>
          <Divider />
          <List>
            <LinkRouter href="/dashboard/posts">
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
            <LinkRouter href="/dashboard/profile">
              <ListItem button>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText>Profil</ListItemText>
              </ListItem>
            </LinkRouter>
            <LinkRouter href="/dashboard/settings">
              <ListItem button>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText>Einstellungen</ListItemText>
              </ListItem>
            </LinkRouter>
          </List>
        </Drawer>
        {children}
      </Grid>
    </Grid>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node
}

export default Dashboard
