import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import rawToHtml from '@utils/rawToHtml'
import htmlRemove from '@utils/htmlRemove'

import Link from '@components/Link'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

function Comments({ comments }) {
  return (
    <Grid container spacing={2}>
      {comments
        .sort((a, b) => a.dateCreated < b.dateCreated)
        .map(comment => {
          const { shortId, urlSlug } = comment.post

          return (
            <Grid key={comment._id} item xs={12}>
              <Card>
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
                  <div
                    dangerouslySetInnerHTML={{
                      __html: htmlRemove(rawToHtml(comment.content))
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}

Comments.propTypes = {
  comments: PropTypes.array
}

export default Comments
