// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Local Components
import CardHeader from './components/CardHeader'
import Tabs from './components/Tabs'

// Services
import { getPostsByUserId } from '@services/post'
import { getProfileByHandle } from '@services/profile'
import { getCommentsByUserId } from '@services/comment'

// MUI
import Grid from '@material-ui/core/Grid'

function ProfileDetails({ profile, posts, comments, handle }) {
  const [profileData, setProfileData] = useState(profile)
  const [postsData, setPostsData] = useState(posts)
  const [commentsData, setCommentsData] = useState(comments)

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardHeader profile={profileData} setProfile={setProfileData} />
      </Grid>
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
