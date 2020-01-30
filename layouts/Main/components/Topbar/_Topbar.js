import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import AuthContext from '../../../../contexts/AuthContext'
import Router from 'next/router'
import logo from './_logo.png'

import { NextLink } from '../../../../components'
import { searchFunc } from '../../../../services/search'
import isEmpty from '../../../../utils/isEmpty'

import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'

import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToApp'
import GroupIcon from '@material-ui/icons/Group'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  logo: {
    width: '150px',
    marginRight: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  list: { width: 250 },
  root: { width: '100%' },
  grow: { flexGrow: 1 },
  menuButton: { marginLeft: -12, marginRight: 20 },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  searchField: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': { backgroundColor: fade(theme.palette.common.black, 0.25) },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: { width: '100%' },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 5),
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

  return (
    <Toolbar className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <div className={classes.menuContainer}>
            <div style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
              <NextLink href="/">
                <Grid container alignItems="center">
                  <img src={logo} className={classes.logo} />
                </Grid>
              </NextLink>
              {/* <Grid container justifyContent="flex-end"> */}
              <div className={classes.searchField}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form noValidate onSubmit={onSubmit}>
                  <InputBase
                    placeholder="Search..."
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
              {/* </Grid> */}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', overflow: 'scroll' }}>
              {isAuthenticated ? (
                <>
                  <Box>
                    <NextLink href="/dashboard/profile">
                      <Button>
                        <AccountCircle />
                        &nbsp;Profile
                      </Button>
                    </NextLink>
                  </Box>
                  <Box>
                    <NextLink href="/dashboard/profile">
                      <Button>
                        <GroupIcon />
                        &nbsp;Members
                      </Button>
                    </NextLink>
                  </Box>
                  <Box>
                    <Button onClick={onLogoutClick}>
                      <ExitToApp />
                      &nbsp;Logout
                    </Button>
                  </Box>
                  <Box>
                    <NextLink href="/create-post">
                      <Button className={classes.button} variant="contained" color="secondary">
                        Post+
                      </Button>
                    </NextLink>
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <NextLink href="/register">
                      <Button className={classes.button} variant="contained" color="secondary">
                        Sign Up
                      </Button>
                    </NextLink>
                  </Box>
                  <Box>
                    <NextLink href="/login">
                      <Button color="primary" className={classes.button} variant="outlined">
                        Log in
                      </Button>
                    </NextLink>
                  </Box>
                </>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Toolbar>
  )
}

ToolbarApp.propTypes = {
  isLightTheme: PropTypes.bool,
  onThemeToggleClick: PropTypes.func
}

export default ToolbarApp
