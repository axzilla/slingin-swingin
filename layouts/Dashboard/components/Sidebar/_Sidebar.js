import React, { useContext } from 'react'
import clsx from 'clsx'

import AuthContext from '@contexts/AuthContext'
import Link from '@components/Link'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import AccountBox from '@material-ui/icons/AccountBox'
import Settings from '@material-ui/icons/Settings'
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode'
import EditIcon from '@material-ui/icons/Edit'
import DashboardIcon from '@material-ui/icons/Dashboard'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: 1
  },
  drawerOpen: {
    position: 'static',
    minHeight: '100vh',
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
  }
}))

function Sidebar() {
  const classes = useStyles()
  const { user } = useContext(AuthContext)

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, classes.drawerOpen, classes.drawerClose)}
      classes={{
        paper: clsx(classes.drawerOpen, classes.drawerClose)
      }}
    >
      <List>
        <Link href="/dashboard/overview">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        </Link>
        <Link href="/dashboard/posts">
          <ListItem button>
            <ListItemIcon>
              <ChromeReaderModeIcon />
            </ListItemIcon>
            <ListItemText>Posts</ListItemText>
          </ListItem>
        </Link>
        <Link href="/dashboard/profile-edit">
          <ListItem button>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Edit Profile</ListItemText>
          </ListItem>
        </Link>
        <Link href="/dashboard/settings">
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItem>
        </Link>
        <Link href="/[handle]" as={`/${user.username}`}>
          <ListItem button>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}

export default Sidebar
