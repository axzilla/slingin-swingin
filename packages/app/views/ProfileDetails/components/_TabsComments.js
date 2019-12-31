import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../../views/LinkRouter'
import Moment from 'react-moment'
import 'moment/locale/de'
import StyledReactMarkdown from '../../common/StyledReactMarkdown'
import { Card, CardContent, Button, Typography, Grid } from '@material-ui/core'

function ProfileDetailsTabsComments({ commentsByUserId, subCommentsByUserId }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  const mergedComments = [...commentsByUserId, ...subCommentsByUserId]

  const commentsItem = mergedComments
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
                <LinkRouter href={`post/${shortId}/${urlSlug}`}>
                  <Typography variant="h6">{comment.refPost.title}</Typography>
                </LinkRouter>
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
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        {commentsItem}
        {commentsByUserId && commentsItem.length === commentsByUserId.length ? null : (
          <Button onClick={loadMore} variant="outlined" color="primary">
            Mehr...
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

ProfileDetailsTabsComments.propTypes = {
  commentsByUserId: PropTypes.array,
  subCommentsByUserId: PropTypes.array
}

export default ProfileDetailsTabsComments
