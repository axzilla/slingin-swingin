import React, { useState, useContext } from 'react'
import Router from 'next/router'

import logo from '/public/_logo_beta.svg'

import AuthContext from '@contexts/AuthContext'
import { useSocket } from '@contexts/SocketContext'
import Link from '@components/Link'
import { searchFunc } from '@services/search'
import isEmpty from '@utils/isEmpty'

import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'

import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles(theme => ({
  appBar: { borderBottom: `1px solid ${fade(theme.palette.common.black, 0.2)}` },
  logo: {
    width: '150px',
    marginRight: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
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
    border: `1px solid ${fade(theme.palette.common.black, 0.1)}`,
    '&:hover': { border: `1px solid ${fade(theme.palette.common.black, 0.2)}` },
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
  button: { margin: theme.spacing(1) }
}))

function Topbar() {
  const { socket } = useSocket()
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

  async function onLogoutClick() {
    await logout()
    socket.close() // Close User Socket
    socket.open() // Open Guest Socket
    Router.push('/login')
  }

  return (
    <>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar>
          <div className={classes.menuContainer}>
            <div style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
              <Link href="/">
                <Grid container alignItems="center">
                  <img src={logo} className={classes.logo} />
                </Grid>
              </Link>
              <div className={classes.searchField}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form noValidate onSubmit={onSubmit}>
                  <InputBase
                    placeholder="Search"
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
            </div>

            <div style={{ display: 'flex', alignItems: 'center', overflow: 'scroll' }}>
              {isAuthenticated ? (
                <>
                  <Box>
                    <Link href="/dashboard/profile-edit">
                      <Button>
                        <AccountCircle />
                        &nbsp;Dashboard
                      </Button>
                    </Link>
                  </Box>
                  <Box>
                    <Button onClick={onLogoutClick}>
                      <ExitToApp />
                      &nbsp;Logout
                    </Button>
                  </Box>
                  <Box>
                    <Link href="/post-create">
                      <Button className={classes.button} variant="contained" color="secondary">
                        Create&nbsp;Post
                      </Button>
                    </Link>
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <Link href="/register">
                      <Button className={classes.button} variant="contained" color="secondary">
                        Get&nbsp;Started
                      </Button>
                    </Link>
                  </Box>
                  <Box>
                    <Link href="/login">
                      <Button color="secondary" className={classes.button} variant="outlined">
                        Log&nbsp;in
                      </Button>
                    </Link>
                  </Box>
                </>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Topbar
