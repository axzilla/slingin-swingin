import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import AuthContext from '../../contexts/AuthContext'
import Router from 'next/router'

import { Link } from '../../components'
import { searchFunc } from '../../services/search'
import isEmpty from '../../utils/isEmpty'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  List
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  AddBox,
  InvertColors as InvertColorsIcon,
  ExitToApp
} from '@material-ui/icons'
import { blue } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
  icon: {
    color: blue[500]
  },
  logoLight: {
    letterSpacing: '2px',
    background: 'black',
    color: 'white',
    borderRadius: '2px',
    padding: '5px 10px'
  },
  logoDark: {
    letterSpacing: '2px',
    background: 'white',
    color: 'black',
    borderRadius: '2px',
    padding: '5px 10px'
  },
  list: {
    width: 250
  },
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  searchDark: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchLight: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  drawerIcon: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  button: {
    margin: theme.spacing(1)
  },
  mobileButton: {
    margin: `${theme.spacing(-1)}px 0`
  },
  textLink: {
    flexGrow: 1,
    display: 'inline'
  }
}))

function ToolbarApp({ isLightTheme, onThemeToggleClick }) {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const classes = useStyles()
  const [toolbarData, setToolbarData] = useState({
    searchText: ''
  })

  function toggleDrawer() {
    setToolbarData({
      ...toolbarData,
      drawerOpen: !toolbarData.drawerOpen
    })
  }

  function onChange(event) {
    setToolbarData({
      ...toolbarData,
      searchText: event.target.value
    })
  }

  function onSubmit(event) {
    event.preventDefault()
    if (!isEmpty(toolbarData.searchText)) {
      searchFunc(toolbarData.searchText)
      Router.push(`/search?q=${toolbarData.searchText}`)
    }
  }

  function onLogoutClick() {
    logout()
    localStorage.removeItem('jwtToken')
    Router.push('/login')
  }

  const sideList = (
    <div className={classes.list}>
      <List>
        <Link href="/">
          <ListItem style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Typography
              className={isLightTheme ? classes.logoLight : classes.logoDark}
              variant="h6"
              noWrap
            >
              CODEHUSTLA
            </Typography>
          </ListItem>
        </Link>
        {!isAuthenticated ? (
          <React.Fragment>
            <ListItem>
              <ListItemText>
                <Link href="/register">
                  <Button
                    fullWidth
                    className={classes.mobileButton}
                    variant="outlined"
                    color="secondary"
                  >
                    Registrieren
                  </Button>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link href="/login">
                  <Button
                    color="primary"
                    fullWidth
                    className={classes.mobileButton}
                    variant="outlined"
                  >
                    Einloggen
                  </Button>
                </Link>
              </ListItemText>
            </ListItem>
          </React.Fragment>
        ) : null}
      </List>
      {isAuthenticated ? (
        <React.Fragment>
          <Divider />

          <Link href="/create-post">
            <ListItem button>
              <ListItemIcon>
                <AddBox />
              </ListItemIcon>
              <ListItemText>Beitrag erstellen</ListItemText>
            </ListItem>
          </Link>
        </React.Fragment>
      ) : null}
      <Divider />

      <List>
        <ListItem button onClick={onThemeToggleClick}>
          <ListItemIcon>
            <InvertColorsIcon />
          </ListItemIcon>
          <ListItemText>Dark/Light</ListItemText>
        </ListItem>
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <IconButton
            className={`${classes.menuButton} ${classes.drawerIcon}`}
            aria-label="Open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography
              className={`${classes.title} ${isLightTheme ? classes.logoLight : classes.logoDark}`}
              variant="h6"
              noWrap
            >
              CODEHUSTLA
            </Typography>
          </Link>

          <div className={isLightTheme ? classes.searchLight : classes.searchDark}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form noValidate onSubmit={onSubmit}>
              <InputBase
                placeholder="Suche..."
                name="searchText"
                type="text"
                onChange={onChange}
                value={toolbarData.searchText}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </form>
          </div>
          <div className={classes.grow} />
          {isAuthenticated ? (
            <div className={classes.sectionDesktop}>
              <Link href="/create-post">
                <Button className={classes.button} variant="outlined" color="primary">
                  Beitrag erstellen
                </Button>
              </Link>
            </div>
          ) : null}

          <div className={classes.sectionDesktop}>
            <IconButton aria-haspopup="true" onClick={onThemeToggleClick}>
              <InvertColorsIcon />
            </IconButton>
          </div>

          {isAuthenticated ? (
            <>
              <Link href="/dashboard/profile">
                <IconButton>
                  <AccountCircle />
                </IconButton>
              </Link>
              <IconButton onClick={onLogoutClick}>
                <ExitToApp />
              </IconButton>
            </>
          ) : (
            <div className={classes.sectionDesktop}>
              <Link href="/register">
                <Button className={classes.button} variant="outlined" color="secondary">
                  Registrieren
                </Button>
              </Link>
              <Link href="/login">
                <Button color="primary" className={classes.button} variant="outlined">
                  Einloggen
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={toolbarData.drawerOpen} onClose={toggleDrawer}>
        <div tabIndex={0} role="button" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          {sideList}
        </div>
      </Drawer>
    </div>
  )
}

ToolbarApp.propTypes = {
  isLightTheme: PropTypes.bool,
  onThemeToggleClick: PropTypes.func
}

export default ToolbarApp
