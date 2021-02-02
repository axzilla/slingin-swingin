// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { authModalReducer } from '@slices/authSlice'

// Services
import { postDelete, postToggleLikes } from '@services/post'

// Global Components
import UserAvatar from '@components/UserAvatar'
import Link from '@components/Link'
import CommentForm from '@components/CommentForm'

// Local Components
import AuthActions from './components/AuthActions'
import Content from './components/Content'
import CommentFeedItem from './components/CommentFeedItem'
import Tags from './components/Tags'
import Title from './components/Title'
import TitleImage from './components/TitleImage'

// MUI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'

function Comment({ comment, comments, setComments, handleSetNestedComments }) {
  const nestedComments = (comment.children || [])
    .sort((a, b) => {
      if (a.dateCreated < b.dateCreated) {
        return 1
      }

      if (a.dateCreated > b.dateCreated) {
        return -1
      }

      return 0
    })
    .map((comment, index) => {
      return (
        <Comment
          key={comment._id + index}
          comment={comment}
          comments={comments}
          setComments={setComments}
          handleSetNestedComments={handleSetNestedComments}
          type="child"
        />
      )
    })

  return (
    <Grid item style={{ marginTop: '16px' }}>
      <Grid container>
        <Grid item>
          <Grid container style={{ height: '100%' }} direction="column" alignItems="center">
            <Grid item>
              <Link href="/[username]" as={`/${comment.user.username}`}>
                <UserAvatar height={30} width={30} user={comment.user} />
              </Link>
            </Grid>
            <Grid item xs>
              <Divider orientation="vertical" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs>
          <CommentFeedItem
            comment={comment}
            comments={comments}
            setComments={setComments}
            handleSetNestedComments={handleSetNestedComments}
          />
          {nestedComments}
        </Grid>
      </Grid>
    </Grid>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  handleSetNestedComments: PropTypes.func.isRequired
}

function PostDetails({ post, commentsData }) {
  const dispatch = useDispatch()
  const [postData, setPostData] = useState(post)
  const [comments, setComments] = useState(commentsData)
  const [nestedComments, setNestedComments] = useState([])
  const { currentUser, isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    handleSetNestedComments()
  }, [comments])

  useEffect(() => {
    handleSetNestedComments()
  }, [])

  function handleSetNestedComments() {
    let index = comments.reduce((a, c) => {
      let comment = Object.assign({}, c)
      comment.children = []
      a.set(c._id, comment)
      return a
    }, new Map())

    Array.from(index.values()).forEach(comment => {
      if (comment.parent) index.get(comment.parent).children.push(comment)
    })

    const res = Array.from(index.values()).filter(c => c.parent === null)

    setNestedComments(res)
  }

  const isLiked = postData.likes.includes(currentUser._id)

  async function handleLikeClick() {
    try {
      if (!isAuthenticated) {
        dispatch(authModalReducer({ isOpen: true, type: 'SignUp' }))
      } else {
        const updatedPost = await postToggleLikes(postData._id)
        setPostData(updatedPost.data)
      }
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardHeader
            title={
              <Link underlined href="/[username]" as={`/${postData.user.username}`}>
                {postData.user.username}
              </Link>
            }
            subheader={
              <small>
                <Moment fromNow>{postData.dateCreated}</Moment>
              </small>
            }
            avatar={
              <Link href="/[username]" as={`/${postData.user.username}`}>
                <UserAvatar user={postData.user} />
              </Link>
            }
          />
          {postData.titleImage && <TitleImage post={postData} />}
          <CardContent>
            {post.location && (
              <Grid container>
                <Box display="inline">
                  <LocationOnIcon color="secondary" />
                </Box>
                <Link
                  underlined
                  href="/place/[shortId]/[urlSlug]"
                  as={`/place/${post.location.shortId}/${post.location.urlSlug}`}
                >
                  <Typography color="textSecondary" display="inline" gutterBottom>
                    {post.location.mapBox.place_name}
                  </Typography>
                </Link>
              </Grid>
            )}
            <Title post={postData} />
            <Box mb={1}>
              <Content post={postData} />
            </Box>
            <Tags post={postData} />
          </CardContent>
          <Box m={2}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography color="textSecondary" variant="subtitle2">
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
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <AuthActions
            post={postData}
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
            postDelete={postDelete}
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        {/* main comment */}
        {isAuthenticated ? (
          <CommentForm
            postId={postData._id}
            postShortId={postData.shortId}
            comments={comments}
            setComments={setComments}
            handleSetNestedComments={handleSetNestedComments}
          />
        ) : null}
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="subtitle1" align="center" color="textSecondary">
              {comments.length} Comments
            </Typography>
          </Grid>
          {nestedComments &&
            nestedComments
              .sort((a, b) => {
                if (a.dateCreated < b.dateCreated) {
                  return 1
                }

                if (a.dateCreated > b.dateCreated) {
                  return -1
                }

                return 0
              })
              .map((comment, index) => {
                return (
                  <Comment
                    key={comment._id + index}
                    comment={comment}
                    comments={comments}
                    setComments={setComments}
                    handleSetNestedComments={handleSetNestedComments}
                  />
                )
              })}
        </Grid>
      </Grid>
    </Grid>
  )
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
  commentsData: PropTypes.array.isRequired
}

export default PostDetails
