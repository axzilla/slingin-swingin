import React from 'react'
import PropTypes from 'prop-types'

import Link from '@components/Link'
import Chip from '@components/Chip'

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
      <Grid container>
        {post.tags.map(tag => {
          return (
            <Link key={tag} href="/posts/t/[tag]" as={`/posts/t/${tag}`}>
              <Chip clickable label={tag} variant="outlined" />
            </Link>
          )
        })}
      </Grid>
    </Grid>
  )
}

Content.propTypes = {
  post: PropTypes.object
}

export default Content
