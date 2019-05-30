// Packages
import React from 'react'
import { Link } from 'react-router-dom'

const PostDetailsTitleImage = props => {
  const { post } = props

  return (
    <Link to={`/post/${post.shortId}/${post.urlSlug}`}>
      {post.titleImage ? (
        <img
          alt="post-title"
          src={post.titleImage.secure_url}
          style={{
            minWidth: '100%',
            maxWidth: '100%',
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px'
          }}
        />
      ) : null}
    </Link>
  )
}

export default PostDetailsTitleImage
