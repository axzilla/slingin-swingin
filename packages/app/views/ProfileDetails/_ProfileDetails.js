// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// Local Components
import Header from './components/Header'
import SendMessage from './components/SendMessage'
import Tabs from './components/Tabs'
import Map from './components/Map'

// Services
import { getPostsByUserId } from '@services/post'
import { getProfileByHandle } from '@services/profile'
import { getCommentsByUserId } from '@services/comment'

// Utils
import isEmpty from '@utils/isEmpty'

// MUI
import Grid from '@material-ui/core/Grid'

function ProfileDetails({ profile, posts, comments, handle }) {
  const [profileData, setProfileData] = useState(profile)
  const [postsData, setPostsData] = useState(posts)
  const [commentsData, setCommentsData] = useState(comments)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    onHandleChange()
  }, [handle])

  async function onHandleChange() {
    const profile = await getProfileByHandle(handle)
    const posts = await getPostsByUserId(profile.data.user._id)
    const comments = await getCommentsByUserId(profile.data.user._id)
    setProfileData(profile.data)
    setPostsData(posts.data)
    setCommentsData(comments.data)
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Header profile={profileData} setProfile={setProfileData} />
      </Grid>
      {!isEmpty(profileData.currentLocation) && (
        <Grid item xs={12}>
          <Map
            lng={profileData.currentLocation.geometry.location.lng}
            lat={profileData.currentLocation.geometry.location.lat}
          />
        </Grid>
      )}
      {profileData.user._id !== user.id && (
        <Grid item xs={12}>
          <Grid container justify="flex-end">
            <SendMessage
              receiverUsername={profileData.user.username}
              receiver={profileData.user._id}
            />
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        <Tabs
          profile={profileData}
          posts={postsData}
          setPosts={setPostsData}
          comments={commentsData}
        />
      </Grid>
    </Grid>
  )
}

ProfileDetails.propTypes = {
  profile: PropTypes.object,
  posts: PropTypes.array,
  comments: PropTypes.array,
  handle: PropTypes.string
}

export default ProfileDetails
