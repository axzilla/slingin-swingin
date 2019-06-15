import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../components/LinkRouter'
import Moment from 'react-moment'
import { useAuth } from '../../contexts/auth'
import { getCommentsByPostRef } from '../comment/_services'
import { getSubCommentByPostRef } from '../subComment/_services'
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'
import isEmpty from '../../utils/isEmpty'
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

function PostFeedItem({ post, history, onLikeClick, onBookmarkClick }) {
  const { auth } = useAuth()
  const classes = useStyles()
  const [commentsLength, setCommentsLength] = useState(0)
  let color

  useEffect(() => {
    getInitialData()
  }, [])

  async function getInitialData() {
    const foundComments = await getCommentsByPostRef(post._id).then(res => res.data)
    const foundSubComments = await getSubCommentByPostRef(post._id).then(res => res.data)
    setCommentsLength(foundComments.length + foundSubComments.length)
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
    if (auth.isAuthenticated) {
      onLikeClick(post._id)
    } else {
      history.push('/login')
    }
  }

  function toggleIsPostBookmarked() {
    if (auth.isAuthenticated) {
      onBookmarkClick(post._id)
    } else {
      history.push('/login')
    }
  }

  return (
    <Card className={classes.card} style={{ marginBottom: '20px' }}>
      {post.titleImage ? (
        <LinkRouter to={`/post/${post.shortId}/${post.urlSlug}`}>
          <CardMedia
            component="img"
            alt="Post Tittle Image"
            className={classes.media}
            height="140"
            image={post.titleImage.secure_url}
          />
        </LinkRouter>
      ) : null}

      <CardContent>
        <Grid container wrap="nowrap">
          <Grid item>
            <LinkRouter to={`/${post.user.username}`}>
              <Avatar
                src={isEmpty(post.user.avatar) ? avatarPlaceholder : post.user.avatar.secure_url}
                className={classes.bigAvatar}
              />
            </LinkRouter>
          </Grid>

          <Grid>
            <Chip
              variant="outlined"
              label={post.type}
              className={classes.chip}
              style={{ border: `2px solid ${color}` }}
            />
            <LinkRouter to={`/post/${post.shortId}/${post.urlSlug}`}>
              <Typography variant="h5" component="h2" color="textSecondary">
                {post.title}
              </Typography>
            </LinkRouter>
            <Grid container>
              {post.tags.map(tag => {
                return (
                  <LinkRouter key={tag} to={`/posts/t/${tag}`}>
                    <Typography color="textSecondary" style={{ display: 'inline', margin: '5px' }}>
                      #{tag}
                    </Typography>
                  </LinkRouter>
                )
              })}
            </Grid>
            <LinkRouter to={`/${post.user.username}`}>
              <Typography gutterBottom className={classes.inlineText}>
                {post.user.username}
              </Typography>
            </LinkRouter>
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
              {post.likes.map(like => like.user).includes(auth.user.id) ? (
                <i className="fas fa-heart fa-lg" />
              ) : (
                <i className="far fa-heart fa-lg" />
              )}
              &nbsp;
              <Typography>{post.likes.length}</Typography>
            </Button>
            <LinkRouter to={`/post/${post.shortId}/${post.urlSlug}`}>
              <Button disableRipple style={{ color: blue[500] }} className={classes.button}>
                <i className="far fa-comment fa-lg" /> &nbsp;
                {commentsLength}
              </Button>
            </LinkRouter>
          </span>
          <Button
            onClick={toggleIsPostBookmarked}
            disableRipple
            style={{ color: blue[500] }}
            className={classes.button}
          >
            {post.bookmarks.map(bookmark => bookmark.user).includes(auth.user.id) ? (
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
  onBookmarkClick: PropTypes.func,
  history: PropTypes.object
}

export default PostFeedItem
