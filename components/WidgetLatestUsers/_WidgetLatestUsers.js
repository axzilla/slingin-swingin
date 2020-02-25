import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'

import { getAllProfiles } from '@services/profile'
import Link from '@components/Link'

import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
  avatar: {
    border: `1px solid ${grey[900]}`,
    height: '50px',
    width: '50px'
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
        {profiles &&
          profiles.slice(0, 10).map(profile => {
            return (
              <CardHeader
                key={profile._id}
                title={
                  <Link underlined href="/[handle]" as={`/${profile.handle}`}>
                    {profile.user.username}
                  </Link>
                }
                subheader={
                  <small>
                    <Moment fromNow>{profile.dateCreated}</Moment>
                  </small>
                }
                avatar={
                  <Link underlined href="/[handle]" as={`/${profile.handle}`}>
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
                }
              />
            )
          })}
      </div>
    </Card>
  )
}

export default LandingWidgetUsers
