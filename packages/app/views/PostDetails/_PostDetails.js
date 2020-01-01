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
import { getCommentsByPostRef } from '../../services/comment'
import { getSubCommentByPostRef } from '../../services/subComment'
import Spinner from '../common/Spinner'

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
  TitleImage,
  Type
} from './components'

import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  chip: {
    borderRadius: '5px',
    marginBottom: '5px'
  }
})

function PostDetails({ postId }) {
  const { isAuthenticated, user } = useContext(AuthContext)
  const classes = useStyles()
  const [isLoading, setIsloading] = useState(false)
  const [post, setPost] = useState([])
  const [commentsByPostRef, setCommentsByPostRef] = useState([])
  const [subCommentsByPostRef, setSubCommentsByPostRef] = useState([])

  useEffect(() => {
    getInitialProps()
  }, [])

  async function getInitialProps() {
    try {
      setIsloading(true)

      const postByShortId = await getPostByShortId(postId)
      const commentsByPostRef = await getCommentsByPostRef(postByShortId.data._id)
      const subCommentsByPostRef = await getSubCommentByPostRef(postByShortId.data._id)

      setPost(postByShortId.data)
      setCommentsByPostRef(commentsByPostRef.data)
      setSubCommentsByPostRef(subCommentsByPostRef.data)
    } catch (error) {
      Router.push('/not-found')
      if (error) throw error
    }

    setIsloading(false)
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
                <Type post={post} classes={classes} />
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
          {isAuthenticated ? (
            <CommentCreate
              postId={post._id}
              postShortId={post.shortId}
              setCommentsByPostRef={setCommentsByPostRef}
              commentsByPostRef={commentsByPostRef}
            />
          ) : null}
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          Kommentare ({commentsByPostRef.length + subCommentsByPostRef.length})
        </Typography>
        {commentsByPostRef &&
          commentsByPostRef.map(comment => {
            return (
              <CommentFeedItem
                key={comment._id}
                post={post}
                comment={comment}
                setCommentsByPostRef={setCommentsByPostRef}
                commentsByPostRef={commentsByPostRef}
              />
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
