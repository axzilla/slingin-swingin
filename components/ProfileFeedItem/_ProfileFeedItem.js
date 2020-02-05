import React from 'react'
import PropTypes from 'prop-types'

import Link from '@components/Link'

import { makeStyles } from '@material-ui/styles'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  name: {
    marginBottom: '-5px'
  },
  username: {
    fontWeight: '500',
    fontFamily: 'Roboto Mono, monospace'
  },
  status: {
    fontWeight: '500',
    fontFamily: 'Roboto Mono, monospace'
  },
  buttonTag: {
    maxWidth: 'auto',
    minWidth: 'auto',
    textTransform: 'lowercase'
  },
  chipPostType: {
    borderRadius: '5px',
    height: '24px'
  },
  tagContent: {
    paddingTop: '0',
    paddingBottom: '0'
  },
  card: {
    width: '100%'
  },
  media: {
    objectFit: 'cover'
  },
  avatar: {
    width: '100px',
    height: '100px',
    marginRight: '20px'
  },
  inlineText: {
    display: 'inline'
  }
})

function ProfilesFeedItem({ profile }) {
  const classes = useStyles()

  return (
    <Card className={classes.card} style={{ marginBottom: '20px' }}>
      <Link href="/[handle]" as={`/${profile.handle}`}>
        <CardContent>
          <Grid container wrap="nowrap">
            <Grid>
              {profile.user.avatar && profile.user.avatar.secure_url ? (
                <Avatar
                  className={classes.avatar}
                  alt={profile.user.username}
                  src={profile.user.avatar.secure_url}
                />
              ) : (
                <Avatar className={classes.avatar} alt={profile.user.username}>
                  {profile.user.username.substring(0, 1).toUpperCase()}
                </Avatar>
              )}
            </Grid>
            <Grid>
              <Typography className={classes.name} variant="h5" component="h2">
                {profile.name}
              </Typography>

              <Typography className={classes.username} gutterBottom style={{ color: blue[500] }}>
                @{profile.user.username}
              </Typography>

              {profile.status ? (
                <Typography gutterBottom className={classes.status}>
                  <i className="fas fa-graduation-cap" style={{ color: red[500] }} />{' '}
                  {profile.status}
                </Typography>
              ) : null}

              <Typography gutterBottom variant="caption">
                {profile.bio ? profile.bio : <span>...hat nichts über sich geschrieben</span>}
              </Typography>

              {profile.location ? (
                <Typography>
                  <i className="fas fa-map-marker-alt" style={{ color: blue[500] }} />{' '}
                  {profile.location}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Link>
    </Card>
  )
}

ProfilesFeedItem.propTypes = {
  profile: PropTypes.object
}

export default ProfilesFeedItem
