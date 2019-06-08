// Packages
import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'

// Contexts
import { useAuth } from '../../contexts/auth'

// Components
import Spinner from '../common/Spinner'

// Actions
import { getPostsByUserId } from '../post/_services'
import { getProfileByHandle, getProfilesByFollowingId, getProfilesByFollowerId } from './_services'

// Features
import ProfileDetailsCardHeader from './ProfileDetailsCardHeader'
import ProfileDetailsTabs from './ProfileDetailsTabs'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
  cardHeader: {
    marginBottom: '20px'
  }
})

const ProfileDetails = ({ profile, loading, post, comments, match }) => {
  const { auth } = useAuth()
  const classes = useStyles()
  const [params] = useState(match.params.handle)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    getProfileByHandle(match.params.handle)
  }, [match.params.handle !== params])

  useEffect(() => {
    if (profile && profile.user) {
      getProfilesByFollowingId(profile.user._id)
      getProfilesByFollowerId(profile.user._id)
      getPostsByUserId(profile.user._id)
      getCommentsByUserId(profile.user._id)
    }
  }, [profile])

  const rgbaColor =
    profile && profile.color
      ? `rgba(${profile.color.r}, ${profile.color.g}, ${profile.color.b}, ${profile.color.a})`
      : null
  let profileContent

  if (profile === null || loading) {
    profileContent = <Spinner />
  } else {
    profileContent = (
      <React.Fragment>
        <Grid item xs={12} className={classes.cardHeader}>
          <ProfileDetailsCardHeader profile={profile} auth={auth} rgbaColor={rgbaColor} />
        </Grid>
        <ProfileDetailsTabs
          profile={profile}
          post={post}
          rgbaColor={rgbaColor}
          comments={comments}
        />
      </React.Fragment>
    )
  }

  return <Grid container>{profileContent}</Grid>
}

export default ProfileDetails
