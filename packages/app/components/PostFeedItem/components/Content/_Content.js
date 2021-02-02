import React from 'react'
import PropTypes from 'prop-types'

import Link from '@components/Link'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

function Content({ post }) {
  return (
    <Grid container>
      <Link underlined href="/post/[postId]/[urlSlug]" as={`/post/${post.shortId}/${post.urlSlug}`}>
        <Typography gutterBottom color="textPrimary" variant="h6" component="h2">
          {post.title}
        </Typography>
      </Link>
    </Grid>
  )
}

Content.propTypes = {
  post: PropTypes.object
}

export default Content
