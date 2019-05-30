// Packages
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'

// Actions
import { getPostsByUserId } from '../../features/post/_actions'

// Features
import PostFeedItem from '../post/PostFeedItem'

const ProfilePostFeed = props => {
  const { posts } = props

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    props.getPostsByUserId(props.profile.user._id)
  }, [])

  const clickLocation = 'postsByUserId'

  const postContent = posts.map((post, i) => (
    <PostFeedItem
      clickLocation={clickLocation}
      key={i}
      post={post}
      userPostsId={props.profile.user._id}
    />
  ))

  return (
    <div>
      <h2>Beiträge ({posts.length})</h2>
      {postContent}
    </div>
  )
}

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getPostsByUserId }
)(ProfilePostFeed)
