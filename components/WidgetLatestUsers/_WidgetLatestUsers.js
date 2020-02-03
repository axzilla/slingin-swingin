import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import { getAllProfiles } from '@services/profile'
import Link from '@components/Link'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles({
  avatar: {
    height: '50px',
    width: '50px',
    marginRight: '15px'
  },
  card: {
    marginBottom: '20px'
  }
})

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
    <Card className={classes.card}>
      <CardHeader title="New Members" />
      <Divider />
      <CardContent>
        <List>
          {profiles &&
            profiles.slice(0, 10).map(profile => {
              return (
                <ListItem key={profile._id}>
                  <Link key={profile._id} href={`/${profile.handle}`}>
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
                      <Link key={profile._id} href={`/${profile.handle}`}>
                        {profile.user.username}
                      </Link>
                    }
                    secondary={<Moment fromNow>{profile.dateCreated}</Moment>}
                  />
                </ListItem>
              )
            })}
        </List>
      </CardContent>
    </Card>
  )
}

LandingWidgetUsers.propTypes = {
  profiles: PropTypes.array
}

export default LandingWidgetUsers
