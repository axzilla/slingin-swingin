// Packages
import React, { useState } from 'react'
import Moment from 'react-moment'
import 'moment/locale/de'

// Components
import Link from '../../components/Link'

// Material Core
import { Grid, Button, Typography, Card, CardContent } from '@material-ui/core'

const TabsPostComments = ({ commentsByUserId }) => {
  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const content = commentsByUserId.slice(0, limit).map(comment => {
    const { shortId, urlSlug } = comment.refPostId

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
              <Link to={`/post/${shortId}/${urlSlug}`}>
                <Typography variant="h6">{comment.refPostId.title}</Typography>
              </Link>
              <Typography variant="caption" style={{ fontWeight: '300' }}>
                <Moment fromNow locale="de">
                  {comment.dateCreated}
                </Moment>
              </Typography>
            </div>
          </div>

          <Typography dangerouslySetInnerHTML={{ __html: comment.text }} className="post-content" />
        </CardContent>
      </Card>
    )
  })
  return (
    <Grid>
      {content}
      {commentsByUserId && content.length === commentsByUserId.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

export default TabsPostComments
