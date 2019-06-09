import React from 'react'
import PropTypes from 'prop-types'

import { useAuth } from '../../contexts/auth'

import Link from '../../components/Link'

import isEmpty from '../../utils/isEmpty'

import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

import { handleUserFollower } from './_services'

import { makeStyles } from '@material-ui/styles'

import { blue, red } from '@material-ui/core/colors'

import { Grid, Avatar, Card, CardContent, Typography, Button } from '@material-ui/core'

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

const ProfilesFeedItem = ({ profile, profileDetails }) => {
  const { auth } = useAuth()

  const classes = useStyles()

  const onFollowButtonclick = () => {
    handleUserFollower(
      profile.user._id,
      profileDetails ? profileDetails.user._id : null,
      profile.handle
    )
  }

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
      {auth.isAuthenticated && profile.user._id !== auth.user.id ? (
        <CardContent>
          <Grid>
            <Button size="small" onClick={onFollowButtonclick} variant="outlined">
              {profile.user.follower.map(follower => follower.user).includes(auth.user.id) ? (
                <span>
                  <i className="fas fa-user-check" /> Entfolgen
                </span>
              ) : (
                <span>
                  <i className="fas fa-user-plus" /> Folgen
                </span>
              )}
            </Button>
          </Grid>
        </CardContent>
      ) : null}
    </Card>
  )
}

ProfilesFeedItem.propTypes = {
  profile: PropTypes.object.isRequired,
  profileDetails: PropTypes.object.isRequired
}

export default ProfilesFeedItem
