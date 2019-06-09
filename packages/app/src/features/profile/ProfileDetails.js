import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import { useAuth } from '../../contexts/auth'

import Spinner from '../common/Spinner'

import { getPostsByUserId } from '../post/_services'
import { getProfileByHandle } from './_services'
import { getCommentsByUserId } from '../comment/_services'

import ProfileDetailsCardHeader from './ProfileDetailsCardHeader'
import ProfileDetailsTabs from './ProfileDetailsTabs'

import { makeStyles } from '@material-ui/styles'

import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
  cardHeader: {
    marginBottom: '20px'
  }
})

const ProfileDetails = ({ match }) => {
  const { auth } = useAuth()
  const classes = useStyles()
  const [params] = useState(match.params.handle)
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({})
  const [postsByUserId, setPostsByUserId] = useState([])
  const [commentsByUserId, setCommentsByUserId] = useState([])

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    getInitialData()
  }, [])

  async function getInitialData() {
    setIsLoading(true)

    const profileUserId = await getProfileByHandle(match.params.handle).then(res => {
      setProfile(res.data)
      return res.data.user._id
    })

    await getPostsByUserId(profileUserId).then(res => setPostsByUserId(res.data))
    await getCommentsByUserId(profileUserId).then(res => setCommentsByUserId(res.data))

    setIsLoading(false)
  }

  const rgbaColor =
    profile && profile.color
      ? `rgba(${profile.color.r}, ${profile.color.g}, ${profile.color.b}, ${profile.color.a})`
      : null

  return (
    <Grid container>
      {isLoading || !profile.user ? (
        <Spinner />
      ) : (
        <>
          <Grid item xs={12} className={classes.cardHeader}>
            <ProfileDetailsCardHeader
              profile={profile}
              auth={auth}
              setProfile={setProfile}
              rgbaColor={rgbaColor}
            />
          </Grid>
          <ProfileDetailsTabs
            profile={profile}
            postsByUserId={postsByUserId}
            setPostsByUserId={setPostsByUserId}
            commentsByUserId={commentsByUserId}
            rgbaColor={rgbaColor}
          />
        </>
      )}
    </Grid>
  )
}

ProfileDetails.propTypes = {
  match: PropTypes.object.isRequired
}

export default ProfileDetails
