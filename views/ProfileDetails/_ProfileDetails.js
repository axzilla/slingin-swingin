import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AuthContext from '@contexts/AuthContext'

import CardHeader from './components/CardHeader'
import Tabs from './components/Tabs'

import Grid from '@material-ui/core/Grid'

function ProfileDetails({ profile, posts, comments }) {
  const [profileData, setProfileData] = useState(profile)
  const [postsData, setPostsData] = useState(posts)
  const [commentsData] = useState(comments)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardHeader profile={profileData} auth={AuthContext} setProfile={setProfileData} />
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
  comments: PropTypes.array
}

export default ProfileDetails
