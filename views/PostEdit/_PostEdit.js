import React from 'react'
import PropTypes from 'prop-types'

import PostForm from '@components/PostForm'

function PostEdit({ post }) {
  return <PostForm post={post} />
}

PostEdit.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostEdit
