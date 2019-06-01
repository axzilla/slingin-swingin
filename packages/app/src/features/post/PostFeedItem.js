// Packages
import React from 'react'
import Link from '../../components/Link'
import { HashLink } from 'react-router-hash-link'
import Moment from 'react-moment'

// Actions
import { handlePostLikes, handlePostBookmarks } from './_services'

// Assets
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

// Utils
import isEmpty from '../../utils/isEmpty'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Colors
import { blue, red } from '@material-ui/core/colors'

// Material Core
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
    width: '100%'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
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

const PostFeedItem = ({
  history,
  post,
  auth,
  clickLocation,
  userPostsId,
  searchString,
  currentUserId
}) => {
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

  const toggleIsPostLiked = () => {
    if (auth.isAuthenticated) {
      handlePostLikes(
        // clickLocation,
        post._id,
        userPostsId,
        searchString,
        auth.user.id
      )
    } else {
      history.push('/login')
    }
  }

  const toggleIsPostBookmarked = () => {
    if (auth.isAuthenticated) {
      handlePostBookmarks(
        clickLocation,
        post._id,
        userPostsId,
        searchString,
        auth.user.id
      )
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
                src={
                  isEmpty(post.user.avatar)
                    ? avatarPlaceholder
                    : post.user.avatar.secure_url
                }
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
              {post.tags.map((tag, i) => {
                return (
                  <Link key={i} to={`/posts/t/${tag}`}>
                    <Typography
                      color="textSecondary"
                      style={{ display: 'inline', margin: '5px' }}
                    >
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
            <Typography
              variant="caption"
              gutterBottom
              className={classes.inlineText}
            >
              {' '}
              -{' '}
              <Moment format="D MMM YYYY" locale="de">
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
              <Button
                disableRipple
                style={{ color: blue[500] }}
                className={classes.button}
              >
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
            {post.bookmarks
              .map(bookmark => bookmark.user)
              .includes(auth.user.id) ? (
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

export default PostFeedItem
