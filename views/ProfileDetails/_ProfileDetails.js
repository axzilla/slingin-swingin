import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import CardHeader from './components/CardHeader'
import Tabs from './components/Tabs'
import { getProfileByHandle } from '@services/profile'

import Grid from '@material-ui/core/Grid'

function ProfileDetails({ profile, posts, comments, handle }) {
  const [profileData, setProfileData] = useState(profile)
  const [postsData, setPostsData] = useState(posts)
  const [commentsData] = useState(comments)

  useEffect(() => {
    onHandleChange()
  }, [handle])

  async function onHandleChange() {
    const profile = await getProfileByHandle(handle)
    setProfileData(profile.data)
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
