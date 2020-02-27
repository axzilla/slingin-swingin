import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'

import { getAllProfiles } from '@services/profile'
import Link from '@components/Link'

import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
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
  const [profiles, setProfiles] = useState()

  useEffect(() => {
    getInitialData()
  }, [])

  async function getInitialData() {
    try {
      const foundProfiles = await getAllProfiles()
      setProfiles(foundProfiles.data)
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Card>
      <CardHeader title="New Members" />
      <CardContent>
        <div className={classes.scrollable}>
          <List className={classes.list} disablePadding dense>
            {profiles &&
              profiles.slice(0, 10).map(profile => {
                return (
                  <ListItem key={profile._id} className={classes.listItem} disableGutters>
                    <ListItemAvatar>
                      <Link href="/[handle]" as={`/${profile.handle}`}>
                        {profile.user.avatar && profile.user.avatar.secure_url ? (
                          <Avatar
                            src={profile.user.avatar.secure_url}
                            className={classes.avatar}
                          ></Avatar>
                        ) : (
                          <Avatar className={classes.avatar}>
                            {profile.user.username.substring(0, 1).toUpperCase()}
                          </Avatar>
                        )}
                      </Link>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link underlined href="/[handle]" as={`/${profile.handle}`}>
                          <div className={classes.noWrap}>{profile.user.username}</div>
                        </Link>
                      }
                      secondary={
                        <small className={classes.noWrap}>
                          <Moment fromNow>{profile.dateCreated}</Moment>
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
