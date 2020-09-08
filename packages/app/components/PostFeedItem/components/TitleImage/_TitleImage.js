import React from 'react'
import PropTypes from 'prop-types'

import Link from '@components/Link'

import { makeStyles } from '@material-ui/styles'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles({
  media: { objectFit: 'cover' }
})

function TitleImage({ post }) {
  const classes = useStyles()

  return (
    <>
      {post.titleImage && (
        <Link href="/post/[postId]/[urlSlug]" as={`/post/${post.shortId}/${post.urlSlug}`}>
          <CardMedia
            component="img"
            alt="Post title"
            className={classes.media}
            height="140"
            image={post.titleImage.secure_url}
          />
        </Link>
      )}
    </>
  )
}

TitleImage.propTypes = {
  post: PropTypes.object
}

export default TitleImage
