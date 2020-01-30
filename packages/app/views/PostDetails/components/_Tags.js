import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { NextLink } from '../../../components'

function PostDetailsTags({ post }) {
  return (
    <Grid container>
      {post.tags.map(tag => {
        return (
          <NextLink key={tag} href={`/posts/t/${tag}`}>
            <Typography color="textSecondary" style={{ display: 'inline', margin: '5px' }}>
              #{tag}
            </Typography>
          </NextLink>
        )
      })}
    </Grid>
  )
}

PostDetailsTags.propTypes = {
  post: PropTypes.object
}

export default PostDetailsTags
