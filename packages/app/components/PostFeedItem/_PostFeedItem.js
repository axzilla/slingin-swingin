import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Link } from '../../components'
import Moment from 'react-moment'
import AuthContext from '../../contexts/AuthContext'
import { getCommentsByPostRef } from '../../services/comment'
import { getSubCommentByPostRef } from '../../services/subComment'
import { makeStyles } from '@material-ui/styles'
import { blue, red } from '@material-ui/core/colors'
import {
  Grid,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip
} from '@material-ui/core'

const useStyles = makeStyles({
  buttonTag: {
    maxWidth: 'auto',
    minWidth: 'auto',
    textTransform: 'lowercase'
  },
  chipPostType: {
    borderRadius: '5px',
    height: '24px'
  },
  tagContent: {
    paddingTop: '0',
    paddingBottom: '0'
  },
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

function PostFeedItem({ post, onLikeClick, onBookmarkClick }) {
  const { isAuthenticated, user } = useContext(AuthContext)
  const classes = useStyles()
  const [commentsLength, setCommentsLength] = useState(0)
  let color

  useEffect(() => {
    getInitialData()
  }, [])

  async function getInitialData() {
    try {
      const foundComments = await getCommentsByPostRef(post._id)
      const foundSubComments = await getSubCommentByPostRef(post._id)
      setCommentsLength(foundComments.data.length + foundSubComments.data.length)
    } catch (error) {
      if (error) throw error
    }
  }

  // https://materialuicolors.co/ Level 200
  if (post.type === 'Tutorial') {
    color = '#F48FB1' // Pink 200
  } else if (post.type === 'Blogartikel') {
    color = '#B39DDB' // Purple 200
  } else if (post.type === 'Diskussion') {
    color = '#90CAF9' // Blue 200
  } else if (post.type === 'Idee') {
    color = '#80CBC4' // Teal 200
  } else if (post.type === 'Projekt') {
    color = '#A5D6A7' // Green 200
  } else if (post.type === 'Frage') {
    color = '#FFCC80' // Orange 200
  } else if (post.type === 'Fun') {
    color = '#FFE082' // Amber 200
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
      {post.titleImage ? (
        <Link href={`/post/${post.shortId}/${post.urlSlug}`}>
          <CardMedia
            component="img"
            alt="Post Tittle Image"
            className={classes.media}
            height="140"
            image={post.titleImage.secure_url}
          />
        </Link>
      ) : null}

      <CardContent>
        <Grid container wrap="nowrap">
          <Grid item>
            <Link href={`/${post.user.username}`}>
              {post.user.avatar && post.user.avatar.secure_url ? (
                <Avatar
                  className={classes.bigAvatar}
                  alt={post.user.username}
                  src={post.user.avatar.secure_url}
                />
              ) : (
                <Avatar className={classes.bigAvatar} alt={post.user.username}>
                  {post.user.username.substring(0, 1)}
                </Avatar>
              )}
            </Link>
          </Grid>

          <Grid>
            <Chip
              variant="outlined"
              label={post.type}
              className={classes.chip}
              style={{ border: `2px solid ${color}` }}
            />
            <Link href={`/post/${post.shortId}/${post.urlSlug}`}>
              <Typography variant="h5" component="h2" color="textSecondary">
                {post.title}
              </Typography>
            </Link>
            <Grid container>
              {post.tags.map(tag => {
                return (
                  <Link key={tag} href={`/posts/t/${tag}`}>
                    <Typography color="textSecondary" style={{ display: 'inline', margin: '5px' }}>
                      #{tag}
                    </Typography>
                  </Link>
                )
              })}
            </Grid>
            <Link href={`/${post.user.username}`}>
              <Typography gutterBottom className={classes.inlineText}>
                {post.user.username}
              </Typography>
            </Link>
            <Typography variant="caption" gutterBottom className={classes.inlineText}>
              {' '}
              -{' '}
              <Moment fromNow locale="de">
                {post.dateCreated}
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
              {post.likes.map(like => like.user).includes(user.id) ? (
                <i className="fas fa-heart fa-lg" />
              ) : (
                <i className="far fa-heart fa-lg" />
              )}
              &nbsp;
              <Typography>{post.likes.length}</Typography>
            </Button>
            <Link href={`/post/${post.shortId}/${post.urlSlug}`}>
              <Button disableRipple style={{ color: blue[500] }} className={classes.button}>
                <i className="far fa-comment fa-lg" /> &nbsp;
                {commentsLength}
              </Button>
            </Link>
          </span>
          <Button
            onClick={toggleIsPostBookmarked}
            disableRipple
            style={{ color: blue[500] }}
            className={classes.button}
          >
            {post.bookmarks.map(bookmark => bookmark.user).includes(user.id) ? (
              <i className="fas fa-bookmark fa-lg" />
            ) : (
              <i className="far fa-bookmark fa-lg" />
            )}
            &nbsp;
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
