import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import AuthContext from '../../../../contexts/AuthContext'
import { getCommentsByUserId } from '../../../../services/comment'

import Link from '../../../../components/Link'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function Comments() {
  const { user } = useContext(AuthContext)
  const [limit, setLimit] = useState(10)
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getInitalData()
  }, [])

  async function getInitalData() {
    setIsLoading(true)
    const foundComments = await getCommentsByUserId(user.id)
    await setComments(foundComments.data)
    setIsLoading(false)
  }

  function loadMore() {
    setLimit(limit + 10)
  }

  const content = comments
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
                <Link to={`/post/${shortId}/${urlSlug}`}>
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
    <Grid>
      {isLoading ? (
        '...Loading'
      ) : (
        <>
          {content}
          {comments && content.length === comments.length ? null : (
            <Button onClick={loadMore} variant="outlined" color="primary">
              Mehr...
            </Button>
          )}
        </>
      )}
    </Grid>
  )
}

Comments.propTypes = {
  commentsByUserId: PropTypes.array
}

export default Comments
