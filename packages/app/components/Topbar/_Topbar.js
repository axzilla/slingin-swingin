// Packages
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { signOutReducer, authModalReducer } from '@slices/authSlice'
import { switchThemeReducer } from '@slices/themeSlice'

// Global Components
import Link from '@components/Link'
import Avatar from '@components/UserAvatar'

// MUI
import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import AddBoxIcon from '@material-ui/icons/AddBox'
import MailIcon from '@material-ui/icons/Mail'
import PlaceIcon from '@material-ui/icons/Place'
import AllInboxIcon from '@material-ui/icons/AllInbox'
import PeopleIcon from '@material-ui/icons/People'

const useStyles = makeStyles(theme => {
  return {
    appBar: { borderBottom: `1px solid ${fade(theme.palette.primary.contrastText, 0.2)}` },
    avatar: {
      width: theme.spacing(5),
      height: theme.spacing(5)
    },
    logo: {
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
    button: { margin: theme.spacing(1) },
    bottomNavigation: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      zIndex: 3,
      borderTop: `1px solid ${fade(theme.palette.text.secondary, 0.2)}`
    }
  }
})

function Topbar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
  const { isAuthenticated, currentUser } = useSelector(state => state.auth)
  const { messages } = useSelector(state => state.notifications)
  const { isDarkTheme } = useSelector(state => state.theme)

  const navigation = [
    { name: 'Places', icon: <PlaceIcon />, link: '/places' },
    { name: 'Posts', icon: <AllInboxIcon />, link: '/' },
    { name: 'People', icon: <PeopleIcon />, link: '/users' }
  ]

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  async function handleLogout() {
    dispatch(signOutReducer())
    router.push('/')
  }

  function handleChangeTheme() {
    dispatch(switchThemeReducer())
  }

  function handleAuthModal() {
    dispatch(authModalReducer({ isOpen: true, type: 'SignUp' }))
  }

  return (
    <>
      <AppBar position="sticky" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Grid container alignItems="center">
                <Link href="/">
                  <Image
                    src={isDarkTheme ? '/_logo_icon_light.svg' : '/_logo_icon_dark.svg'}
                    alt="logo"
                    width={40}
                    height={40}
                    className={classes.logo}
                  />
                </Link>
                <Hidden smDown>
                  {navigation.map(item => {
                    return (
                      <Link key={item.name} href={item.link}>
                        <Button>{item.name} </Button>
                      </Link>
                    )
                  })}
                </Hidden>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                {isAuthenticated ? (
                  <>
                    <Grid item>
                      <Link href="/post-create">
                        <Button variant="contained" color="secondary">
                          <AddBoxIcon />
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={handleChangeTheme}>
                        <InvertColorsIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Link href="/chats">
                        <IconButton>
                          <Badge color="secondary" variant="dot" invisible={!messages}>
                            <MailIcon />
                          </Badge>
                        </IconButton>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Button aria-haspopup="true" onClick={handleClick}>
                        <Avatar hideOnlineStatus user={currentUser} height={35} width={35} />
                      </Button>
                      <Menu
                        PaperProps={{ style: { width: '25ch' } }}
                        anchorEl={anchorEl}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {/* Hack starts - because of strange console error in client */}
                        <div />
                        {/* Hack ends */}

                        <Link href={`/${currentUser.username}`}>
                          <MenuItem>View profile</MenuItem>
                        </Link>
                        <Link href="/account-settings">
                          <MenuItem>Account</MenuItem>
                        </Link>
                        <Link href="/post-create">
                          <MenuItem>Create Post</MenuItem>
                        </Link>

                        <Box my={1}>
                          <Divider />
                        </Box>
                        <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                      </Menu>
                    </Grid>
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
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Hidden mdUp>
        <BottomNavigation value={router.pathname} className={classes.bottomNavigation} showLabels>
          {navigation.map(item => {
            return (
              <BottomNavigationAction
                onClick={() => router.push(item.link)}
                key={item.name}
                label={item.name}
                icon={item.icon}
                value={item.link}
              />
            )
          })}
        </BottomNavigation>
      </Hidden>
    </>
  )
}

export default Topbar
