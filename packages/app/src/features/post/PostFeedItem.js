import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../components/Link'
import { HashLink } from 'react-router-hash-link'
import Moment from 'react-moment'

import { useAuth } from '../../contexts/auth'

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
  card: {
    // width: '100%'
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

function PostFeedItem({ history, post, onLikeClick, onBookmarkClick }) {
  const { auth } = useAuth()
  const classes = useStyles()
  let color

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
        <Link to={`/post/${post.shortId}/${post.urlSlug}`}>
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
            <Link to={`/${post.user.username}`}>
              <Avatar
                src={isEmpty(post.user.avatar) ? avatarPlaceholder : post.user.avatar.secure_url}
                className={classes.bigAvatar}
              />
            </Link>
          </Grid>

          <Grid>
            <Chip
              variant="outlined"
              label={post.type}
              className={classes.chip}
              style={{ border: `2px solid ${color}` }}
            />
            <Link to={`/post/${post.shortId}/${post.urlSlug}`}>
              <Typography variant="h5" component="h2" color="textSecondary">
                {post.title}
              </Typography>
            </Link>
            <Grid container>
              {post.tags.map(tag => {
                return (
                  <Link key={tag} to={`/posts/t/${tag}`}>
                    <Typography color="textSecondary" style={{ display: 'inline', margin: '5px' }}>
                      #{tag}
                    </Typography>
                  </Link>
                )
              })}
            </Grid>
            <Link to={`/${post.user.username}`}>
              <Typography
                variant="caption"
                gutterBottom
                color="primary"
                className={classes.inlineText}
              >
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
              {post.likes.map(like => like.user).includes(auth.user.id) ? (
                <i className="fas fa-heart fa-lg" />
              ) : (
                <i className="far fa-heart fa-lg" />
              )}
              &nbsp;
              <Typography>{post.likes.length}</Typography>
            </Button>
            <HashLink to={`/post/${post.shortId}/${post.urlSlug}#comments`}>
              <Button disableRipple style={{ color: blue[500] }} className={classes.button}>
                <i className="far fa-comment fa-lg" /> &nbsp;
                {post.comments.length}
              </Button>
            </HashLink>
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
  history: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  userPostsId: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired
}

export default PostFeedItem
