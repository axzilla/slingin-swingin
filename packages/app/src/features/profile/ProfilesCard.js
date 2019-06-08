// Packages
import React from 'react'

// Components
import Link from '../../components/Link'

// Utils
import isEmpty from '../../utils/isEmpty'

// Assets
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

// Actions
import { handleUserFollower } from './_services'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Colors
import { blue, red } from '@material-ui/core/colors'

// Material Core
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
    // ⚠️ object-fit is not supported by IE 11.
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

const ProfilesCard = props => {
  const { profile, location, profileDetails, searchString, auth } = props

  const classes = useStyles()

  const onFollowButtonclick = () => {
    props.handleUserFollower(
      location,
      profile.user._id,
      profileDetails ? profileDetails.user._id : null,
      profile.handle,
      searchString
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

export default ProfilesCard
