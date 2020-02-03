import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import { Link } from '../../../../../../components'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

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
                <Link href={`post/${shortId}/${urlSlug}`}>
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
