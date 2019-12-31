import React from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../views/LinkRouter'
import { makeStyles } from '@material-ui/styles'
import { blue, red } from '@material-ui/core/colors'
import { Grid, Avatar, Card, CardContent, Typography } from '@material-ui/core'

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
      <LinkRouter href={`/${profile.user.username}`}>
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
                  {profile.user.username.substring(0, 1)}
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
      </LinkRouter>
    </Card>
  )
}

ProfilesFeedItem.propTypes = {
  profile: PropTypes.object
}

export default ProfilesFeedItem
