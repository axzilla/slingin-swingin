import React, { useState, useContext } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import NextLink from '../../components/NextLink'
import Chip from '../../components/Chip'
import AuthContext from '../../contexts/AuthContext'
import { postToggleLikes, postToggleBookmarks } from '../../services/post'

import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'

import FavoriteIcon from '@material-ui/icons/Favorite'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'

const useStyles = makeStyles({
  media: { objectFit: 'cover' },
  bigAvatar: { marginRight: '10px' },
  inlineText: { display: 'inline' }
})

function PostFeedItem({ post }) {
  const [postData, setPostData] = useState(post)
  const { isAuthenticated, user } = useContext(AuthContext)
  const classes = useStyles()

  async function onLikeClick(postId) {
    try {
      const updatedPost = await postToggleLikes(postId)
      setPostData(updatedPost.data)
    } catch (error) {
      if (error) throw error
    }
  }

  async function onBookmarkClick(postId) {
    try {
      const updatedPost = await postToggleBookmarks(postId)
      setPostData(updatedPost.data)
    } catch (error) {
      if (error) throw error
    }
  }

  function toggleIsPostLiked() {
    if (isAuthenticated) {
      onLikeClick(post._id)
    } else {
      Router.push('/login')
    }
  }

  function toggleIsPostBookmarked() {
    if (isAuthenticated) {
      onBookmarkClick(post._id)
    } else {
      Router.push('/login')
    }
  }

  return (
    <Card className={classes.card} style={{ marginBottom: '20px' }}>
      <CardHeader
        avatar={
          <NextLink href={`/${postData.user.username}`}>
            {postData.user.avatar && postData.user.avatar.secure_url ? (
              <Avatar
                className={classes.bigAvatar}
                alt={postData.user.username}
                src={postData.user.avatar.secure_url}
              />
            ) : (
              <Avatar className={classes.bigAvatar} alt={postData.user.username}>
                {postData.user.username.substring(0, 1).toUpperCase()}
              </Avatar>
            )}
          </NextLink>
        }
        title={<NextLink href={`/${postData.user.username}`}>{postData.user.username}</NextLink>}
        subheader={<Moment fromNow>{postData.dateCreated}</Moment>}
      />
      {postData.titleImage ? (
        <NextLink href={`/post/${postData.shortId}/${postData.urlSlug}`}>
          <CardMedia
            component="img"
            alt="Post Tittle Image"
            className={classes.media}
            height="140"
            image={postData.titleImage.secure_url}
          />
        </NextLink>
      ) : (
        <Divider />
      )}
      <CardContent>
        <Grid container wrap="nowrap">
          <Grid>
            <NextLink href={`/post/${postData.shortId}/${postData.urlSlug}`}>
              <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
                {postData.title}
              </Typography>
            </NextLink>
            <Grid container>
              {postData.tags.map(tag => {
                return (
                  <NextLink key={tag} href={`/posts/t/${tag}`}>
                    <Chip clickable label={tag} variant="outlined" />
                  </NextLink>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <IconButton onClick={toggleIsPostBookmarked}>
                {postData.bookmarks.map(bookmark => bookmark.user).includes(user.id) ? (
                  <BookmarkIcon color="primary" />
                ) : (
                  <BookmarkIcon />
                )}
              </IconButton>
              <Typography>{postData.bookmarks.length} Bookmarks</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <IconButton onClick={toggleIsPostLiked}>
                {postData.likes.map(like => like.user).includes(user.id) ? (
                  <FavoriteIcon color="primary" />
                ) : (
                  <FavoriteIcon />
                )}
              </IconButton>
              <Typography>{postData.likes.length} Likes</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <NextLink href={`/post/${postData.shortId}/${postData.urlSlug}`}>
              <Grid container alignItems="center">
                <IconButton>
                  <ChatBubbleIcon />
                </IconButton>
                <Typography>{postData.postComments.length} Comments</Typography>
              </Grid>
            </NextLink>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

PostFeedItem.propTypes = {
  post: PropTypes.object,
  onLikeClick: PropTypes.func,
  onBookmarkClick: PropTypes.func
}

export default PostFeedItem
