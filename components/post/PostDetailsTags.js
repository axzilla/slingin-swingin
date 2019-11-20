import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import LinkRouter from '../../components/LinkRouter'

function PostDetailsTags({ post }) {
  return (
    <Grid container>
      {post.tags.map(tag => {
        return (
          <LinkRouter key={tag} href={`/posts/t/${tag}`}>
            <Typography color="textSecondary" style={{ display: 'inline', margin: '5px' }}>
              #{tag}
            </Typography>
          </LinkRouter>
        )
      })}
    </Grid>
  )
}

PostDetailsTags.propTypes = {
  post: PropTypes.object
}

export default PostDetailsTags
