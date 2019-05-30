// Packages
import React from 'react'

// Material Core
import { Grid, Typography } from '@material-ui/core'

// Components
import Link from '../../components/Link'

const PostDetailsTags = props => {
  const { post } = props

  return (
    <Grid container>
      {post.tags.map((tag, i) => {
        return (
          <Link key={i} to={`/posts/t/${tag}`}>
            <Typography
              color="textSecondary"
              style={{ display: 'inline', margin: '5px' }}
            >
              #{tag}
            </Typography>
          </Link>
        )
      })}
    </Grid>
  )
}

export default PostDetailsTags
