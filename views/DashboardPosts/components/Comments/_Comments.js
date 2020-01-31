import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import 'moment/locale/de'

import AuthContext from '../../../../contexts/AuthContext'
import { getCommentsByUserId } from '../../../../services/comment'

import NextLink from '../../../../components/NextLink'
import StyledReactMarkdown from '../../../../components/StyledReactMarkdown'

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
  commentsByUserId: PropTypes.array,
  subCommentsByUserId: PropTypes.array
}

export default Comments
