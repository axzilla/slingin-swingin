import React, { useState, useEffect, useContext } from 'react'
import Moment from 'react-moment'

import rawToHtml from '@utils/rawToHtml'
import htmlRemove from '@utils/htmlRemove'
import AuthContext from '@contexts/AuthContext'
import { getCommentsByUserId } from '@services/comment'
import Link from '@components/Link'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function Comments() {
  const { user } = useContext(AuthContext)
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

  return (
    <Grid container spacing={2}>
      {isLoading ? (
        '...Loading'
      ) : (
        <>
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
                          <Link href="/post/[postId]/[urlSlug]" as={`/post/${shortId}/${urlSlug}`}>
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
        </>
      )}
    </Grid>
  )
}

export default Comments
