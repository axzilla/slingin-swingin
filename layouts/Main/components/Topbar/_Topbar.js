import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import AuthContext from '../../../../contexts/AuthContext'
import Router from 'next/router'

import { NextLink } from '../../../../components'
import { searchFunc } from '../../../../services/search'
import isEmpty from '../../../../utils/isEmpty'

import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'

import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AddBox from '@material-ui/icons/AddBox'
import ExitToApp from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles(theme => ({
  list: { width: 250 },
  root: { width: '100%' },
  grow: { flexGrow: 1 },
  menuButton: { marginLeft: -12, marginRight: 20 },
  searchField: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': { backgroundColor: fade(theme.palette.common.black, 0.25) },
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
  inputRoot: { width: '100%' },
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
    [theme.breakpoints.up('md')]: { display: 'flex' }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: { display: 'none' }
  },
  drawerIcon: {
    display: 'flex',
    [theme.breakpoints.up('md')]: { display: 'none' }
  },
  button: { margin: theme.spacing(1) },
  mobileButton: { margin: `${theme.spacing(-1)}px 0` }
}))

function ToolbarApp() {
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
        <NextLink href="/">
          <ListItem style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Typography variant="h6" noWrap>
              bounce
            </Typography>
          </ListItem>
        </NextLink>
        {!isAuthenticated ? (
          <React.Fragment>
            <ListItem>
              <ListItemText>
                <NextLink href="/register">
                  <Button
                    fullWidth
                    className={classes.mobileButton}
                    variant="outlined"
                    color="secondary"
                  >
                    Sign Up
                  </Button>
                </NextLink>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <NextLink href="/login">
                  <Button
                    color="primary"
                    fullWidth
                    className={classes.mobileButton}
                    variant="outlined"
                  >
                    Log in
                  </Button>
                </NextLink>
              </ListItemText>
            </ListItem>
          </React.Fragment>
        ) : null}
      </List>
      {isAuthenticated ? (
        <React.Fragment>
          <Divider />

          <NextLink href="/create-post">
            <ListItem button>
              <ListItemIcon>
                <AddBox />
              </ListItemIcon>
              <ListItemText>Beitrag erstellen</ListItemText>
            </ListItem>
          </NextLink>
        </React.Fragment>
      ) : null}
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
          <NextLink href="/">LOGO</NextLink>

          <div className={classes.searchField}>
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
              <NextLink href="/create-post">
                <Button className={classes.button} variant="outlined" color="primary">
                  Beitrag erstellen
                </Button>
              </NextLink>
            </div>
          ) : null}

          {isAuthenticated ? (
            <>
              <NextLink href="/dashboard/profile">
                <IconButton>
                  <AccountCircle />
                </IconButton>
              </NextLink>
              <IconButton onClick={onLogoutClick}>
                <ExitToApp />
              </IconButton>
            </>
          ) : (
            <div className={classes.sectionDesktop}>
              <NextLink href="/register">
                <Button className={classes.button} variant="outlined" color="secondary">
                  Sign Up
                </Button>
              </NextLink>
              <NextLink href="/login">
                <Button color="primary" className={classes.button} variant="outlined">
                  Log in
                </Button>
              </NextLink>
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
