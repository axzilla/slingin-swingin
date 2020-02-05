import React from 'react'
import PropTypes from 'prop-types'

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

  return <CardMedia alt="Post title" className={classes.media} image={post.titleImage.secure_url} />
}

PostDetailsTitleImage.propTypes = {
  post: PropTypes.object
}

export default PostDetailsTitleImage
