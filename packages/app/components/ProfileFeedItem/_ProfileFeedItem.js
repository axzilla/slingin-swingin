// PAckages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import Link from '@components/Link'
import UserAvatar from '@components/UserAvatar'

// MUI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import RoomIcon from '@material-ui/icons/Room'

function ProfilesFeedItem({ user }) {
  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Link underlined href="/[username]" as={`/${user.username}`}>
            <Typography variant="h5">{user.name}</Typography>
          </Link>
        }
        subheader={
          <>
            <Link underlined href="/[username]" as={`/${user.username}`}>
              <Typography gutterBottom color="textSecondary">
                @{user.username}
              </Typography>
            </Link>
            {user.locationFrom && (
              <Grid spacing={1} container wrap="nowrap">
                <Grid item>
                  <HomeIcon />
                </Grid>
                <Grid item>
                  <Typography color="textPrimary">{user.locationFrom.mapBox.place_name}</Typography>
                </Grid>
              </Grid>
            )}
            {user.locationCurrent && (
              <Grid spacing={1} container wrap="nowrap">
                <Grid item>
                  <RoomIcon />
                </Grid>
                <Grid item>
                  <Typography color="textPrimary">
                    {user.locationCurrent.mapBox.place_name}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </>
        }
        avatar={
          <Link href="/[username]" as={`/${user.username}`}>
            <UserAvatar height={100} width={100} user={user} />
          </Link>
        }
      />
    </Card>
  )
}

ProfilesFeedItem.propTypes = {
  user: PropTypes.object
}

export default ProfilesFeedItem
