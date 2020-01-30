import React, { useState, useContext } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import { NextLink } from '../../components'
import AuthContext from '../../contexts/AuthContext'
import { postToggleLikes, postToggleBookmarks } from '../../services/post'

import { makeStyles } from '@material-ui/styles'
import { blue, red } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles({
  media: {
    objectFit: 'cover'
  },
  bigAvatar: {
    marginRight: '10px'
  },
  inlineText: {
    display: 'inline'
  },
  chip: {
    borderRadius: '5px',
    marginBottom: '5px',
    margin: '5px'
  }
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
      ) : null}

      <CardContent>
        <Grid container wrap="nowrap">
          <Grid item>
            <NextLink href={`/${postData.user.username}`}>
              {postData.user.avatar && postData.user.avatar.secure_url ? (
                <Avatar
                  className={classes.bigAvatar}
                  alt={postData.user.username}
                  src={postData.user.avatar.secure_url}
                />
              ) : (
                <Avatar className={classes.bigAvatar} alt={postData.user.username}>
                  {postData.user.username.substring(0, 1)}
                </Avatar>
              )}
            </NextLink>
          </Grid>

          <Grid>
            <Chip variant="outlined" label={postData.type} className={classes.chip} />
            <NextLink href={`/post/${postData.shortId}/${postData.urlSlug}`}>
              <Typography variant="h5" component="h2" color="textSecondary">
                {postData.title}
              </Typography>
            </NextLink>
            <Grid container>
              {postData.tags.map(tag => {
                return (
                  <NextLink key={tag} href={`/posts/t/${tag}`}>
                    <Typography color="textSecondary" style={{ display: 'inline', margin: '5px' }}>
                      #{tag}
                    </Typography>
                  </NextLink>
                )
              })}
            </Grid>
            <NextLink href={`/${postData.user.username}`}>
              <Typography gutterBottom className={classes.inlineText}>
                {postData.user.username}
              </Typography>
            </NextLink>
            <Typography variant="caption" gutterBottom className={classes.inlineText}>
              {' '}
              -{' '}
              <Moment fromNow locale="de">
                {postData.dateCreated}
              </Moment>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="space-between">
          <span>
            <Button
              disableRipple
              onClick={toggleIsPostLiked}
              style={{ color: red[500] }}
              className={classes.button}
            >
              {postData.likes.map(like => like.user).includes(user.id) ? (
                <i className="fas fa-heart fa-lg" />
              ) : (
                <i className="far fa-heart fa-lg" />
              )}
              &nbsp;
              <Typography>{postData.likes.length}</Typography>
            </Button>
            <NextLink href={`/post/${postData.shortId}/${postData.urlSlug}`}>
              <Button disableRipple style={{ color: blue[500] }} className={classes.button}>
                <i className="far fa-comment fa-lg" />
              </Button>
            </NextLink>
          </span>
          <Button
            onClick={toggleIsPostBookmarked}
            disableRipple
            style={{ color: blue[500] }}
            className={classes.button}
          >
            {postData.bookmarks.map(bookmark => bookmark.user).includes(user.id) ? (
              <i className="fas fa-bookmark fa-lg" />
            ) : (
              <i className="far fa-bookmark fa-lg" />
            )}
          </Button>
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
