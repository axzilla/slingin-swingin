import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import 'moment/locale/de'
import { NextLink, StyledReactMarkdown } from '../../../components'
import { Grid, Button, Typography, Card, CardContent } from '@material-ui/core'

function TabsPostComments({ commentsByUserId, subCommentsByUserId }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  const mergedComments = [...commentsByUserId, ...subCommentsByUserId]
  const content = mergedComments
    .sort((a, b) => a.dateCreated < b.dateCreated)
    .slice(0, limit)
    .map(comment => {
      const { shortId, urlSlug } = comment.refPost

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
                <NextLink to={`/post/${shortId}/${urlSlug}`}>
                  <Typography variant="h6">{comment.refPost.title}</Typography>
                </NextLink>
                <Typography variant="caption" style={{ fontWeight: '300' }}>
                  <Moment fromNow locale="de">
                    {comment.dateCreated}
                  </Moment>
                </Typography>
              </div>
            </div>
            <StyledReactMarkdown source={comment.text} escapeHtml={false} type="read" />
          </CardContent>
        </Card>
      )
    })
  return (
    <Grid>
      {content}
      {mergedComments && content.length === mergedComments.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

TabsPostComments.propTypes = {
  commentsByUserId: PropTypes.array,
  subCommentsByUserId: PropTypes.array
}

export default TabsPostComments
