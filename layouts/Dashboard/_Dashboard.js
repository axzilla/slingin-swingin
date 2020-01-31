import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import AuthContext from '../../contexts/AuthContext'
import Container from '../../components/Container'
import NextLink from '../../components/NextLink'
import Topbar from '../../components/Topbar'
import TopbarMixings from '../../components/TopbarMixings'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
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

function Dashboard({ children }) {
  const classes = useStyles()
  const { user } = useContext(AuthContext)

  return (
    <>
      <Topbar />
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
            <TopbarMixings />
            <List>
              <NextLink href="/dashboard/overview">
                <ListItem button>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText>Dashboard</ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/dashboard/posts">
                <ListItem button>
                  <ListItemIcon>
                    <ChromeReaderModeIcon />
                  </ListItemIcon>
                  <ListItemText>Posts</ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/dashboard/edit-profile">
                <ListItem button>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText>Edit Profile</ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/dashboard/settings">
                <ListItem button>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href={`/${user.username}`}>
                <ListItem button>
                  <ListItemIcon>
                    <AccountBox />
                  </ListItemIcon>
                  <ListItemText>My Profile</ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Drawer>
          <Container>{children}</Container>
        </Grid>
      </Grid>
    </>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node
}

export default Dashboard
