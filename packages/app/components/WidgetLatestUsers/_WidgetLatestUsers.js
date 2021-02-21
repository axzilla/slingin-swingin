// Packages
import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'

// Services
import { getAllUsers } from '@services/user'

// Global Components
import Link from '@components/Link'
import UserAvatar from '@components/UserAvatar'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Card from '@material-ui/core/Card'
// import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'

const useStyles = makeStyles(theme => ({
  avatar: {
    border: `1px solid ${grey[900]}`
  },
  scrollable: { overflow: 'scroll' },
  list: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex'
    }
  },
  listItem: {
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(2)
    }
  },
  noWrap: {
    whiteSpace: 'nowrap'
  }
}))

function WidgetLatestUsers() {
  const classes = useStyles()
  const [users, setUsers] = useState()

  useEffect(() => {
    getInitialData()
  }, [])

  async function getInitialData() {
    try {
      const users = await getAllUsers()
      setUsers(users.data)
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Grid container justify="space-between">
            <Grid item>New Members</Grid>
            {/* <Link href="/all-members" underlined>
              <Grid item>
                <Typography>All</Typography>
              </Grid>
            </Link> */}
          </Grid>
        }
      />
      <CardContent>
        <div className={classes.scrollable}>
          <List className={classes.list} disablePadding dense>
            {users &&
              users.result.slice(0, 10).map(user => {
                return (
                  <ListItem key={user._id} className={classes.listItem} disableGutters>
                    <ListItemAvatar>
                      <Link href="/[username]" as={`/${user.username}`}>
                        <UserAvatar user={user} />
                      </Link>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link
                          color="textPrimary"
                          underlined
                          href="/[username]"
                          as={`/${user.username}`}
                        >
                          <div className={classes.noWrap}>{user.username}</div>
                        </Link>
                      }
                      secondary={
                        <small className={classes.noWrap}>
                          <Moment fromNow>{user.dateActivated}</Moment>
                        </small>
                      }
                    />
                  </ListItem>
                )
              })}
          </List>
        </div>
      </CardContent>
    </Card>
  )
}

export default WidgetLatestUsers
