import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import AuthContext from '../../contexts/AuthContext'

import { getPostsByUserId } from '../post/_services'
import { getProfileByHandle } from './_services'
import { getCommentsByUserId } from '../comment/_services'
import { getSubCommentsByUserId } from '../subComment/_services'

import Spinner from '../common/Spinner'
import ProfileDetailsCardHeader from './ProfileDetailsCardHeader'
import ProfileDetailsTabs from './ProfileDetailsTabs'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
  cardHeader: {
    marginBottom: '20px'
  }
})

function ProfileDetails({ handle }) {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({})
  const [postsByUserId, setPostsByUserId] = useState([])
  const [commentsByUserId, setCommentsByUserId] = useState([])
  const [subCommentsByUserId, setSubCommentsByUserId] = useState([])

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    getInitialData()
  }, [])

  async function getInitialData() {
    setIsLoading(true)

    try {
      const profileUserId = await getProfileByHandle(handle).then(res => {
        setProfile(res.data)
        return res.data.user._id
      })

      await getPostsByUserId(profileUserId).then(res => setPostsByUserId(res.data))
      await getCommentsByUserId(profileUserId).then(res => setCommentsByUserId(res.data))
      await getSubCommentsByUserId(profileUserId).then(res => setSubCommentsByUserId(res.data))
    } catch (err) {
      Router.push('/not-found')
    }

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
              auth={AuthContext}
              setProfile={setProfile}
              rgbaColor={rgbaColor}
            />
          </Grid>
          <ProfileDetailsTabs
            profile={profile}
            postsByUserId={postsByUserId}
            setPostsByUserId={setPostsByUserId}
            commentsByUserId={commentsByUserId}
            subCommentsByUserId={subCommentsByUserId}
            rgbaColor={rgbaColor}
          />
        </>
      )}
    </Grid>
  )
}

ProfileDetails.propTypes = {
  handle: PropTypes.string
}

export default ProfileDetails
