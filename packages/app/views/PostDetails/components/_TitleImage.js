import React from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../../views/LinkRouter'

function PostDetailsTitleImage({ post }) {
  return (
    <LinkRouter href={`/post/${post.shortId}/${post.urlSlug}`}>
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
    </LinkRouter>
  )
}

PostDetailsTitleImage.propTypes = {
  post: PropTypes.object
}

export default PostDetailsTitleImage
