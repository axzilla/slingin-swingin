import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import rawToHtml from '@utils/rawToHtml'
import htmlRemove from '@utils/htmlRemove'

import Link from '@components/Link'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

function Comments({ comments }) {
  return (
    <Grid container spacing={2}>
      {comments
        .sort((a, b) => a.dateCreated < b.dateCreated)
        .map(comment => {
          return (
            <Link key={comment._id} href="post/[postId]" as={`post/${comment.post._id}`}>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardActionArea>
                    <CardContent>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '10px'
                        }}
                      >
                        <div>
                          {/* <Typography variant="h6">{comment.post.title}</Typography> */}
                          <Typography variant="caption" style={{ fontWeight: '300' }}>
                            <Moment fromNow>{comment.dateCreated}</Moment>
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: htmlRemove(rawToHtml(comment.contentRaw))
                        }}
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Link>
          )
        })}
    </Grid>
  )
}

Comments.propTypes = {
  comments: PropTypes.array
}

export default Comments
