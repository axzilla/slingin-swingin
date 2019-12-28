import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import 'moment/locale/de'

import { getAllProfiles } from '../profile/_services'

import LinkRouter from '../../components/LinkRouter'

import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box
} from '@material-ui/core'

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
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          <Box fontFamily="Monospace" fontWeight={900}>
            @neue mitglieder
          </Box>
        </Typography>
        <List>
          {profiles &&
            profiles.slice(0, 10).map(profile => {
              return (
                <ListItem key={profile._id}>
                  <LinkRouter key={profile._id} href={`/${profile.handle}`}>
                    <ListItemAvatar>
                      {profile.user.avatar && profile.user.avatar.secure_url ? (
                        <Avatar
                          src={profile.user.avatar.secure_url}
                          className={classes.avatar}
                        ></Avatar>
                      ) : (
                        <Avatar className={classes.avatar}>
                          {profile.user.username.substring(0, 1)}
                        </Avatar>
                      )}
                    </ListItemAvatar>
                  </LinkRouter>
                  <ListItemText
                    primary={
                      <LinkRouter key={profile._id} href={`/${profile.handle}`}>
                        {profile.user.username}
                      </LinkRouter>
                    }
                    secondary={
                      <Moment fromNow locale="de">
                        {profile.dateCreated}
                      </Moment>
                    }
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
