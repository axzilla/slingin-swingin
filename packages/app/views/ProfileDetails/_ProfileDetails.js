import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

import AuthContext from '../../contexts/AuthContext'

import { getPostsByUserId } from '../../services/post'
import { getProfileByHandle } from '../../services/profile'
import { getCommentsByUserId } from '../../services/comment'
import { getSubCommentsByUserId } from '../../services/subComment'

import Spinner from '../common/Spinner'
import { CardHeader, Tabs } from './components'

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
    getInitialData()
  }, [])

  async function getInitialData() {
    try {
      setIsLoading(true)

      const profileUserId = await getProfileByHandle(handle)
      const foundPostsByUserId = await getPostsByUserId(profileUserId.data.user._id)
      const foundCommentsByUserId = await getCommentsByUserId(profileUserId.data.user._id)
      const foundSubCommentsByUserId = await getSubCommentsByUserId(profileUserId.data.user._id)

      setProfile(profileUserId.data)
      setPostsByUserId(foundPostsByUserId.data)
      setCommentsByUserId(foundCommentsByUserId.data)
      setSubCommentsByUserId(foundSubCommentsByUserId.data)

      setIsLoading(false)
    } catch (error) {
      Router.push('/not-found')
    }
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
            <CardHeader
              profile={profile}
              auth={AuthContext}
              setProfile={setProfile}
              rgbaColor={rgbaColor}
            />
          </Grid>
          <Tabs
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
