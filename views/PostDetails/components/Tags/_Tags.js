import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import Chip from '@components/Chip'
import Link from '@components/Link'

function PostDetailsTags({ post }) {
  return (
    <Grid container>
      {post.tags.map(tag => {
        return (
          <Link key={tag} href="/posts/t/[tag]" as={`/posts/t/${tag}`}>
            <Chip clickable label={tag} variant="outlined" color="textSecondary" />
          </Link>
        )
      })}
    </Grid>
  )
}

PostDetailsTags.propTypes = {
  post: PropTypes.object
}

export default PostDetailsTags
