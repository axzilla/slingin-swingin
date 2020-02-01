import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import AuthContext from '../../contexts/AuthContext'
import {
  getPostByShortId,
  postDelete,
  postToggleLikes,
  postToggleBookmarks
} from '../../services/post'
import { Spinner } from '../../components'

import {
  AuthActions,
  Avatar,
  Bookmarks,
  Content,
  CommentCreate,
  CommentFeedItem,
  Creator,
  Date,
  Likes,
  Tags,
  Title,
  TitleImage
} from './components'

import { Card, CardContent, Grid, Typography } from '@material-ui/core'

function PostDetails({ postId }) {
  const { isAuthenticated, user } = useContext(AuthContext)
  const [isLoading, setIsloading] = useState(false)
  const [post, setPost] = useState({})
  const [postComments, setPostComments] = useState([])

  useEffect(() => {
    getInitialProps()
  }, [])

  async function getInitialProps() {
    try {
      setIsloading(true)

      const foundPost = await getPostByShortId(postId)
      await setPost(foundPost.data)

      const filteredPostComments = foundPost.data.postComments.filter(item => {
        return item.replies.length > 0
      })

      // await setPostComments(filteredPostComments)
      await setPostComments(foundPost.data.postComments)

      console.log(filteredPostComments)
      console.log(foundPost.data.postComments)

      setIsloading(false)
    } catch (error) {
      Router.push('/not-found')
      if (error) throw error
    }
  }

  async function onLikeClick(id) {
    try {
      if (!isAuthenticated) {
        Router.push('/login')
      }

      await postToggleLikes(id)
      const updatedPost = await getPostByShortId(postId)
      setPost(updatedPost.data)
    } catch (error) {
      if (error) throw error
    }
  }

  async function onBookmarkClick(id) {
    try {
      if (!isAuthenticated) {
        Router.push('/login')
      }

      await postToggleBookmarks(id)
      const updatedPost = await getPostByShortId(postId)
      setPost(updatedPost.data)
    } catch (error) {
      if (error) throw error
    }
  }

  let postContent

  if (isLoading) {
    postContent = <Spinner />
  } else if (post && post.user) {
    postContent = (
      <Grid item xs={12} sm={8}>
        <Grid>
          <Card>
            <TitleImage post={post} />
            <CardContent>
              <div style={{ width: '100%' }}>
                <Title post={post} />
                <Tags post={post} />
                <div style={{ margin: '30px 0' }}>
                  <Avatar post={post} />
                  <Creator post={post} />
                  <Typography style={{ display: 'inline' }}> - </Typography>
                  <Date post={post} />
                </div>
                <Content post={post} />
                <div style={{ display: 'flex' }}>
                  <Likes post={post} user={user} onLikeClick={onLikeClick} />
                  <Bookmarks post={post} user={user} onBookmarkClick={onBookmarkClick} />
                </div>
              </div>
            </CardContent>
            <AuthActions
              post={post}
              user={user}
              isAuthenticated={isAuthenticated}
              postDelete={postDelete}
            />
          </Card>
        </Grid>
        <Grid style={{ marginBottom: '50px' }}>
          {isAuthenticated ? <CommentCreate postId={post._id} postShortId={post.shortId} /> : null}
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          Kommentare ({post.postComments.length})
        </Typography>
        {postComments &&
          postComments.map(postComment => {
            return (
              <>
                <CommentFeedItem
                  key={postComment._id}
                  post={post}
                  postComment={postComment}
                  postComments={postComments}
                />
              </>
            )
          })}
      </Grid>
    )
  }

  return (
    <Grid container justify="center">
      {postContent}
    </Grid>
  )
}

PostDetails.propTypes = {
  urlSlug: PropTypes.string,
  postId: PropTypes.string
}

export default PostDetails
