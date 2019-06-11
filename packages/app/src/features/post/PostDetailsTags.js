import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import Link from '../../components/Link'

function PostDetailsTags({ post }) {
  return (
    <Grid container>
      {post.tags.map(tag => {
        return (
          <Link key={tag} to={`/posts/t/${tag}`}>
            <Typography color="textSecondary" style={{ display: 'inline', margin: '5px' }}>
              #{tag}
            </Typography>
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
