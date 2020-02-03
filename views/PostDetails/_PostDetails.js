import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import AuthContext from '../../contexts/AuthContext'
import {
  getPostByShortId,
  postDelete,
  postToggleLikes,
  postToggleBookmarks
} from '../../services/post'

import Spinner from '../../components/Spinner'
import Link from '../../components/Link'
import Container from '../../components/Container'

import {
  AuthActions,
  Bookmarks,
  Content,
  CommentCreate,
  CommentFeedItem,
  Likes,
  Tags,
  Title,
  TitleImage
} from './components'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import CardActions from '@material-ui/core/CardActions'

function PostDetails({ postId }) {
  const { isAuthenticated, user } = useContext(AuthContext)
  const [isLoading, setIsloading] = useState(false)
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    getInitialProps()
  }, [])

  async function getInitialProps() {
    try {
      setIsloading(true)

      const foundPost = await getPostByShortId(postId)
      await setPost(foundPost.data)
      await setComments(foundPost.data.postComments)

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
      <Container maxWidth="md">
        <Grid item>
          <Card>
            <CardHeader
              title={
                <Link href={`/${post.user.username}`}>
                  <Typography color="primary" style={{ display: 'inline' }}>
                    {post.user.username}
                  </Typography>
                </Link>
              }
              subheader={<Moment fromNow>{post.dateCreated}</Moment>}
              avatar={
                <Link href={`/${post.user.username}`}>
                  {post.user.avatar && post.user.avatar.secure_url ? (
                    <Avatar alt={post.user.username} src={post.user.avatar.secure_url} />
                  ) : (
                    <Avatar alt={post.user.username}>
                      {post.user.username.substring(0, 1).toUpperCase()}
                    </Avatar>
                  )}
                </Link>
              }
            />
            <Divider />
            {post.titleImage && <TitleImage post={post} />}
            <CardContent>
              <Title post={post} />
              <Tags post={post} />
              <Content post={post} />
            </CardContent>
            <Divider />
            <CardActions>
              <div style={{ display: 'flex', width: '100%' }}>
                <Likes post={post} user={user} onLikeClick={onLikeClick} />
                <Bookmarks post={post} user={user} onBookmarkClick={onBookmarkClick} />
              </div>
            </CardActions>
            <AuthActions
              post={post}
              user={user}
              isAuthenticated={isAuthenticated}
              postDelete={postDelete}
            />
          </Card>
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          Comments ({comments.length})
        </Typography>
        <Grid style={{ marginBottom: '50px' }}>
          {isAuthenticated ? (
            <CommentCreate
              postId={post._id}
              postShortId={post.shortId}
              comments={comments}
              setComments={setComments}
            />
          ) : null}
        </Grid>
        {comments &&
          comments.map(comment => {
            return (
              <>
                <CommentFeedItem
                  key={comment._id}
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                />
              </>
            )
          })}
      </Container>
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
