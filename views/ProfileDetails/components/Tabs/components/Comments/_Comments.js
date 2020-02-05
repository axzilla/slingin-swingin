import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import Link from '@components/Link'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

function Comments({ comments }) {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        {comments
          .sort((a, b) => a.dateCreated < b.dateCreated)
          .map(comment => {
            const { shortId, urlSlug } = comment.post

            return (
              <Card key={comment._id} style={{ marginBottom: '20px' }}>
                <CardContent>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}
                  >
                    <div>
                      <Link href="post/[postId]/[urlSlug]" as={`post/${shortId}/${urlSlug}`}>
                        <Typography variant="h6">{comment.post.title}</Typography>
                      </Link>
                      <Typography variant="caption" style={{ fontWeight: '300' }}>
                        <Moment fromNow>{comment.dateCreated}</Moment>
                      </Typography>
                    </div>
                  </div>
                  <Typography>{comment.text}</Typography>
                </CardContent>
              </Card>
            )
          })}
      </Grid>
    </Grid>
  )
}

Comments.propTypes = {
  comments: PropTypes.array
}

export default Comments
