// Packages
import React, { useState } from 'react'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { signOutReducer, setIsAuthModalReducer } from '@slices/authSlice'
import { switchThemeReducer } from '@slices/themeSlice'

// Contexts
import { useSocket } from '@contexts/SocketContext'

// Global Components
import Link from '@components/Link'
import Avatar from '@components/UserAvatar'

// MUI
import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import AppBar from '@material-ui/core/AppBar'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import PublicIcon from '@material-ui/icons/Public'
import AddBoxIcon from '@material-ui/icons/AddBox'

const useStyles = makeStyles(theme => ({
  appBar: { borderBottom: `1px solid ${fade(theme.palette.primary.contrastText, 0.2)}` },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  logo: {
    height: '40px',
    marginRight: theme.spacing(2)
  },
  menuButton: { marginLeft: -12, marginRight: 20 },
  menuContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  searchField: {
    background: fade(theme.palette.primary.contrastText, 0.23),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${fade(theme.palette.primary.contrastText, 0.1)}`,
    '&:hover': { border: `1px solid ${fade(theme.palette.primary.contrastText, 0.2)}` },
    marginLeft: 0,
    width: '100%'
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
  const dispatch = useDispatch()
  const { socket } = useSocket()
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const { isDarkTheme } = useSelector(state => state.theme)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  async function handleLogout() {
    dispatch(signOutReducer())
    socket.close() // Close User Socket
    socket.open() // Open Guest Socket
    Router.push('/')
  }

  function handleChangeTheme() {
    dispatch(switchThemeReducer())
  }

  function handleAuthModal() {
    dispatch(setIsAuthModalReducer(true))
  }

  return (
    <>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Container maxWidth="lg">
          <Toolbar style={{ padding: 0 }}>
            <div className={classes.menuContainer}>
              <div style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
                <Link href="/">
                  <Grid container alignItems="center">
                    <img
                      src={isDarkTheme ? '/_logo_icon_light.svg' : '/_logo_icon_dark.svg'}
                      className={classes.logo}
                    />
                  </Grid>
                </Link>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {isAuthenticated ? (
                  <>
                    <Hidden smDown>
                      <Box>
                        <Link href="/post-create">
                          <IconButton color="secondary">
                            <AddBoxIcon />
                          </IconButton>
                        </Link>
                      </Box>
                    </Hidden>
                    <Box>
                      <Link href="/chats">
                        <IconButton>
                          <MailIcon />
                        </IconButton>
                      </Link>
                    </Box>
                    <Box>
                      <IconButton onClick={handleChangeTheme}>
                        <InvertColorsIcon />
                      </IconButton>
                    </Box>
                    <Box>
                      <Link href="/places">
                        <IconButton>
                          <PublicIcon />
                        </IconButton>
                      </Link>
                    </Box>
                    <Box>
                      <IconButton aria-haspopup="true" onClick={handleClick}>
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        elevation={0}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {/* Hack starts - because of strange console error in client */}
                        <div />
                        {/* Hack ends */}
                        <Link href="/[handle]" as={`/${user.username}`}>
                          <MenuItem>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item>
                                <Avatar user={user} />
                              </Grid>
                              <Grid item>
                                <Typography variant="overline">@{user.username}</Typography>
                              </Grid>
                            </Grid>
                          </MenuItem>
                        </Link>
                        <Box my={1}>
                          <Divider />
                        </Box>
                        <Link href="/post-create">
                          <MenuItem>Create Post</MenuItem>
                        </Link>
                        <Link href="/dashboard/profile-edit">
                          <MenuItem>Dashboard </MenuItem>
                        </Link>
                        <Link href="/dashboard/settings">
                          <MenuItem>Settings </MenuItem>
                        </Link>
                        <Box my={1}>
                          <Divider />
                        </Box>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </Box>
                  </>
                ) : (
                  <Grid container wrap="nowrap">
                    <Box>
                      <Button
                        onClick={handleAuthModal}
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                      >
                        Get&nbsp;Started
                      </Button>
                    </Box>
                    <Box>
                      <IconButton onClick={handleChangeTheme}>
                        <InvertColorsIcon />
                      </IconButton>
                    </Box>
                    <Box>
                      <Link href="/places">
                        <IconButton>
                          <PublicIcon />
                        </IconButton>
                      </Link>
                    </Box>
                  </Grid>
                )}
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Topbar
