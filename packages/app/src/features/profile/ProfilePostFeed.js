import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import { getPostsByUserId } from '../../features/post/_services'

import PostFeedItem from '../post/PostFeedItem'

const ProfilePostFeed = ({ posts, profile }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    getPostsByUserId(profile.user._id)
  }, [])

  const postContent = posts.map(post => (
    <PostFeedItem key={post._id} post={post} userPostsId={profile.user._id} />
  ))

  return (
    <div>
      <h2>Beiträge ({posts.length})</h2>
      {postContent}
    </div>
  )
}

ProfilePostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired
}

export default ProfilePostFeed
