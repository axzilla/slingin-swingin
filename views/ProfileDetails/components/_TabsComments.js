import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NextLink } from '../../../components'
import Moment from 'react-moment'

import { StyledReactMarkdown } from '../../../components'
import { Card, CardContent, Button, Typography, Grid } from '@material-ui/core'

function ProfileDetailsTabsComments({ commentsByUserId }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  const commentsItem = commentsByUserId
    .sort((a, b) => a.dateCreated < b.dateCreated)
    .slice(0, limit)
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
                <NextLink href={`post/${shortId}/${urlSlug}`}>
                  <Typography variant="h6">{comment.post.title}</Typography>
                </NextLink>
                <Typography variant="caption" style={{ fontWeight: '300' }}>
                  <Moment fromNow>{comment.dateCreated}</Moment>
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
  commentsByUserId: PropTypes.array
}

export default ProfileDetailsTabsComments
