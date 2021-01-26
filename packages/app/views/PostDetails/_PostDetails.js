// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { authModalReducer } from '@slices/authSlice'

// Services
// import { postDelete, postToggleLikes, postToggleBookmarks } from '@services/post'
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
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'
// import BookmarkIcon from '@material-ui/icons/Bookmark'
import FavoriteIcon from '@material-ui/icons/Favorite'

function PostDetails({ post }) {
  const dispatch = useDispatch()
  const [postData, setPostData] = useState(post)
  const [comments, setComments] = useState(post.postComments)
  const { user, isAuthenticated } = useSelector(state => state.auth)

  // const isBookmarked = postData.bookmarks.includes(user.id)
  const isLiked = postData.likes.includes(user.id)

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

  // async function handleBookmarkClick() {
  //   try {
  //     if (!isAuthenticated) {
  //       dispatch(authModalReducer({ isOpen: true, type: 'SignUp' }))
  //     } else {
  //       const updatedPost = await postToggleBookmarks(postData._id)
  //       setPostData(updatedPost.data)
  //     }
  //   } catch (error) {
  //     if (error) throw error
  //   }
  // }

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardHeader
            title={
              <Link underlined href="/[handle]" as={`/${postData.user.username}`}>
                {postData.user.username}
              </Link>
            }
            subheader={
              <small>
                <Moment fromNow>{postData.dateCreated}</Moment>
              </small>
            }
            avatar={
              <Link href="/[handle]" as={`/${postData.user.username}`}>
                <UserAvatar user={postData.user} />
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
                  {/* <Grid item>
                    <BookmarkIcon
                      color={isBookmarked ? 'textPrimary' : 'disabled'}
                      onClick={handleBookmarkClick}
                    />
                  </Grid> */}
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
      <Grid item xs={12}>
        {isAuthenticated ? (
          <CommentForm
            postId={postData._id}
            postShortId={postData.shortId}
            comments={comments}
            setComments={setComments}
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
          {comments &&
            comments
              .sort((a, b) => {
                if (a.dateCreated < b.dateCreated) {
                  return 1
                }

                if (a.dateCreated > b.dateCreated) {
                  return -1
                }

                return 0
              })
              .map(comment => {
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
