import React, { useState, useContext } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import AuthContext from '@contexts/AuthContext'
import { postDelete, postToggleLikes, postToggleBookmarks } from '@services/post'
import Link from '@components/Link'

import AuthActions from './components/AuthActions'
import Content from './components/Content'
import CommentCreate from './components/CommentCreate'
import CommentFeedItem from './components/CommentFeedItem'
import Tags from './components/Tags'
import Title from './components/Title'
import TitleImage from './components/TitleImage'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'

import BookmarkIcon from '@material-ui/icons/Bookmark'
import FavoriteIcon from '@material-ui/icons/Favorite'

function PostDetails({ post }) {
  const { isAuthenticated, user } = useContext(AuthContext)
  const [postData, setPostData] = useState(post)
  const [comments, setComments] = useState(post.postComments)

  const isBookmarked = postData.bookmarks.includes(user.id)
  const isLiked = postData.likes.includes(user.id)

  async function handleLikeClick() {
    try {
      if (!isAuthenticated) {
        Router.push('/login')
      }

      const updatedPost = await postToggleLikes(postData._id)
      setPostData(updatedPost.data)
    } catch (error) {
      if (error) throw error
    }
  }

  async function handleBookmarkClick() {
    try {
      if (!isAuthenticated) {
        Router.push('/login')
      }

      const updatedPost = await postToggleBookmarks(postData._id)
      setPostData(updatedPost.data)
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Grid container justify="center" direction="column" spacing={2}>
      <Grid item>
        <Card>
          <CardHeader
            title={
              <Link href="/[handle]" as={`/${postData.user.username}`}>
                <Typography color="primary">{postData.user.username}</Typography>
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
          {postData.titleImage && <TitleImage post={postData} />}
          <CardContent>
            <Title post={postData} />
            <Box mb={1}>
              <Content post={postData} />
            </Box>
            <Tags post={postData} />
          </CardContent>
          <Box m={2}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography color="textSecondary" variant="h6">
                  {postData.likes.length} likes
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <FavoriteIcon
                      onClick={handleLikeClick}
                      color={isLiked ? 'secondary' : 'disabled'}
                    />
                  </Grid>
                  <Grid item>
                    <BookmarkIcon
                      color={isBookmarked ? 'primary' : 'disabled'}
                      onClick={handleBookmarkClick}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <AuthActions
            post={postData}
            user={user}
            isAuthenticated={isAuthenticated}
            postDelete={postDelete}
          />
        </Card>
      </Grid>
      <Grid item>
        {isAuthenticated ? (
          <CommentCreate
            postId={postData._id}
            postShortId={postData.shortId}
            comments={comments}
            setComments={setComments}
          />
        ) : null}
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4" align="center" color="textSecondary">
              {comments.length} Comments
            </Typography>
          </Grid>
          {comments &&
            comments.map(comment => {
              return (
                <Grid key={comment._id} item>
                  <CommentFeedItem
                    comment={comment}
                    comments={comments}
                    setComments={setComments}
                  />
                </Grid>
              )
            })}
        </Grid>
      </Grid>
    </Grid>
  )
}

PostDetails.propTypes = {
  post: PropTypes.object
}

export default PostDetails
