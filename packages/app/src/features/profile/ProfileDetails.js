import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import { useAuth } from '../../contexts/auth'

import Spinner from '../common/Spinner'

import { getPostsByUserId } from '../post/_services'
import { getProfileByHandle, getProfilesByFollowingId, getProfilesByFollowerId } from './_services'

import ProfileDetailsCardHeader from './ProfileDetailsCardHeader'
import ProfileDetailsTabs from './ProfileDetailsTabs'

import { makeStyles } from '@material-ui/styles'

import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
  cardHeader: {
    marginBottom: '20px'
  }
})

const ProfileDetails = ({ profile, post, comments, match }) => {
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
      // getCommentsByUserId(profile.user._id)
    }
  }, [profile])

  const rgbaColor =
    profile && profile.color
      ? `rgba(${profile.color.r}, ${profile.color.g}, ${profile.color.b}, ${profile.color.a})`
      : null

  return (
    <Grid container>
      <Grid item xs={12} className={classes.cardHeader}>
        <ProfileDetailsCardHeader profile={profile} auth={auth} rgbaColor={rgbaColor} />
      </Grid>
      <ProfileDetailsTabs profile={profile} post={post} rgbaColor={rgbaColor} comments={comments} />
    </Grid>
  )
}

ProfileDetails.propTypes = {
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default ProfileDetails
