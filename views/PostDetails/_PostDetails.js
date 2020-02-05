import React, { useState, useContext } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import AuthContext from '@contexts/AuthContext'
import { getPostByShortId, postDelete, postToggleLikes, postToggleBookmarks } from '@services/post'
import Link from '@components/Link'
import Container from '@components/Container'

import AuthActions from './components/AuthActions'
import Bookmarks from './components/Bookmarks'
import Content from './components/Content'
import CommentCreate from './components/CommentCreate'
import CommentFeedItem from './components/CommentFeedItem'
import Likes from './components/Likes'
import Tags from './components/Tags'
import Title from './components/Title'
import TitleImage from './components/TitleImage'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import CardActions from '@material-ui/core/CardActions'

function PostDetails({ post }) {
  const { isAuthenticated, user } = useContext(AuthContext)
  const [postData, setPostData] = useState(post)
  const [comments, setComments] = useState([])

  async function onLikeClick() {
    try {
      if (!isAuthenticated) {
        Router.push('/login')
      }

      await postToggleLikes(postData._id)
      const updatedPost = await getPostByShortId(postData.shortId)
      setPostData(updatedPost.data)
    } catch (error) {
      if (error) throw error
    }
  }

  async function onBookmarkClick() {
    try {
      if (!isAuthenticated) {
        Router.push('/login')
      }

      await postToggleBookmarks(postData._id)
      const updatedPost = await getPostByShortId(postData.shortId)
      setPostData(updatedPost.data)
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Grid container justify="center">
      <Container maxWidth="md">
        <Grid item>
          <Card>
            <CardHeader
              title={
                <Link href="/[handle]" as={`/${postData.user.username}`}>
                  <Typography color="primary" style={{ display: 'inline' }}>
                    {postData.user.username}
                  </Typography>
                </Link>
              }
              subheader={<Moment fromNow>{postData.dateCreated}</Moment>}
              avatar={
                <Link href="/[handle]" as={`/${postData.user.username}`}>
                  {postData.user.avatar && postData.user.avatar.secure_url ? (
                    <Avatar alt={postData.user.username} src={postData.user.avatar.secure_url} />
                  ) : (
                    <Avatar alt={postData.user.username}>
                      {postData.user.username.substring(0, 1).toUpperCase()}
                    </Avatar>
                  )}
                </Link>
              }
            />
            <Divider />
            {postData.titleImage && <TitleImage post={postData} />}
            <CardContent>
              <Title post={postData} />
              <Tags post={postData} />
              <Content post={postData} />
            </CardContent>
            <Divider />
            <CardActions>
              <div style={{ display: 'flex', width: '100%' }}>
                <Likes post={postData} user={user} onLikeClick={onLikeClick} />
                <Bookmarks post={postData} user={user} onBookmarkClick={onBookmarkClick} />
              </div>
            </CardActions>
            <AuthActions
              post={postData}
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
              postId={postData._id}
              postShortId={postData.shortId}
              comments={comments}
              setComments={setComments}
            />
          ) : null}
        </Grid>
        {comments &&
          comments.map(comment => {
            return (
              <CommentFeedItem
                key={comment._id}
                comment={comment}
                comments={comments}
                setComments={setComments}
              />
            )
          })}
      </Container>
    </Grid>
  )
}

PostDetails.propTypes = {
  post: PropTypes.object
}

export default PostDetails
