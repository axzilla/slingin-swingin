import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../components/Link'
import isEmpty from '../../utils/isEmpty'
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'
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
      <Link to={`/${profile.user.username}`}>
        <CardContent>
          <Grid container wrap="nowrap">
            <Grid>
              <Avatar
                className={classes.avatar}
                src={
                  isEmpty(profile.user.avatar) ? avatarPlaceholder : profile.user.avatar.secure_url
                }
                alt="profile-avatar"
              />
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
