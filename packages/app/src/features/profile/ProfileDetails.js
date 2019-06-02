// Packages
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'

// Components
import Spinner from '../common/Spinner'

// Actions
import { getPostsByUserId } from '../post/_services'
import {
  getProfileByHandle,
  getProfilesByFollowingId,
  getProfilesByFollowerId
} from './_actions'
// import { getCommentsByUserId } from '../comment/_actions'

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

const ProfileDetails = props => {
  const [params] = useState(props.match.params.handle)
  const classes = useStyles()
  const { auth, profile, loading, post, comments } = props

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    props.getProfileByHandle(props.match.params.handle)
  }, [props.match.params.handle !== params])

  useEffect(() => {
    if (props.profile && props.profile.user) {
      props.getProfilesByFollowingId(props.profile.user._id)
      props.getProfilesByFollowerId(props.profile.user._id)
      props.getPostsByUserId(props.profile.user._id)
      props.getCommentsByUserId(props.profile.user._id)
    }
  }, [props.profile])

  const rgbaColor =
    profile && profile.color
      ? `rgba(${profile.color.r}, ${profile.color.g}, ${profile.color.b}, ${
          profile.color.a
        })`
      : null
  let profileContent

  if (profile === null || loading) {
    profileContent = <Spinner />
  } else {
    profileContent = (
      <React.Fragment>
        <Grid item xs={12} className={classes.cardHeader}>
          <ProfileDetailsCardHeader
            profile={profile}
            auth={auth}
            rgbaColor={rgbaColor}
          />
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

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  comments: state.comments,
  profile: state.profile.profile
})

const mapDispatchToProps = {
  getProfileByHandle,
  getPostsByUserId,
  getProfilesByFollowerId,
  getProfilesByFollowingId
  // getCommentsByUserId
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetails)
