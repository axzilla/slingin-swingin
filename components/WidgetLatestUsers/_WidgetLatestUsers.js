import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'

import { getAllProfiles } from '@services/profile'
import Link from '@components/Link'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  avatar: {
    height: '50px',
    width: '50px',
    marginRight: '15px'
  },
  cardContent: { overflow: 'scroll' },
  list: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex'
    }
  }
}))

function LandingWidgetUsers() {
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
      <div className={classes.cardContent}>
        <List className={classes.list}>
          {profiles &&
            profiles.slice(0, 10).map(profile => {
              return (
                <ListItem key={profile._id}>
                  <Link href="/[handle]" as={`/${profile.handle}`}>
                    <ListItemAvatar>
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
                    </ListItemAvatar>
                  </Link>
                  <ListItemText
                    primary={
                      <Link href="/[handle]" as={`/${profile.handle}`}>
                        {profile.user.username}
                      </Link>
                    }
                    secondary={<Moment fromNow>{profile.dateCreated}</Moment>}
                  />
                </ListItem>
              )
            })}
        </List>
      </div>
    </Card>
  )
}

export default LandingWidgetUsers
