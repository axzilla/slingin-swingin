import React from 'react'
import PropTypes from 'prop-types'

import NextLink from '../../../components/NextLink'

import { makeStyles } from '@material-ui/styles'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
})

function PostDetailsTitleImage({ post }) {
  const classes = useStyles()

  return (
    <NextLink href={`/post/${post.shortId}/${post.urlSlug}`}>
      <CardMedia alt="Post title" className={classes.media} image={post.titleImage.secure_url} />
    </NextLink>
  )
}

PostDetailsTitleImage.propTypes = {
  post: PropTypes.object
}

export default PostDetailsTitleImage
