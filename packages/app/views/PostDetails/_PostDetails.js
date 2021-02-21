// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Gif } from '@giphy/react-components'
import ResizeObserver from 'react-resize-observer'

// Redux
import { authModalReducer } from '@slices/authSlice'

// Services
import { postDelete, postToggleLikes } from '@services/post'

// Global Components
import UserAvatar from '@components/UserAvatar'
import Link from '@components/Link'
import CommentForm from '@components/CommentForm'
import PostForm from '@components/PostForm'

// Local Components
import Content from './components/Content'
import CommentFeedItem from './components/CommentFeedItem'
import MediaFile from './components/MediaFile'

// MUI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

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
  const router = useRouter()
  const dispatch = useDispatch()
  const [postData, setPostData] = useState(post)
  const [editPostOpen, setEditPostOpen] = useState(false)
  const [deletePostOpen, setDeletePostOpen] = useState(false)
  const [comments, setComments] = useState(commentsData)
  const [nestedComments, setNestedComments] = useState([])
  const { currentUser, isAuthenticated } = useSelector(state => state.auth)
  const [anchorEl, setAnchorEl] = useState(null)
  const [width, setWidth] = useState()

  useEffect(() => {
    setPostData(post)
  }, [post])

  const handleEditPostOpen = () => {
    setEditPostOpen(true)
  }

  const handleEditPostClose = () => {
    setEditPostOpen(false)
  }

  const handleDeletePostOpen = () => {
    setDeletePostOpen(true)
  }

  const handleDeletePostClose = () => {
    setDeletePostOpen(false)
  }

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

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

  async function handleDeleteClick() {
    try {
      await postDelete(postData._id)
      router.push('/')
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <Grid container alignItems="center" justify="space-between">
              <Grid item xs={12}>
                <CardHeader
                  title={
                    <Grid container alignItems="center">
                      <Box display="inline" mr={1}>
                        <IconButton size="small" color="primary" onClick={() => router.back()}>
                          <ArrowBackIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="h6" display="inline">
                        Post
                      </Typography>
                    </Grid>
                  }
                />
                <Divider />
              </Grid>

              <Grid item xs>
                <CardHeader
                  avatar={
                    <Link href="/[username]" as={`/${postData.user.username}`}>
                      <UserAvatar user={postData.user} />
                    </Link>
                  }
                  title={
                    <Link
                      color="textPrimary"
                      underlined
                      href="/[username]"
                      as={`/${postData.user.username}`}
                    >
                      <Typography display="inline">
                        <Box m={0} display="inline" fontWeight="bold">
                          {postData.user.name}{' '}
                        </Box>
                        <Box display="inline" color="text.secondary">
                          @{postData.user.username}
                        </Box>
                      </Typography>
                    </Link>
                  }
                  subheader={<Moment fromNow>{postData.dateCreated}</Moment>}
                />
              </Grid>

              {isAuthenticated && post.user._id === currentUser._id && (
                <Grid item>
                  <Box mr={1}>
                    <IconButton size="small" onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleMenuClose()
                          handleEditPostOpen()
                        }}
                      >
                        <Grid container alignItems="center">
                          <EditIcon fontSize="small" style={{ marginRight: 8 }} />
                          <Typography>
                            <Box fontWeight={500}>Edit Post</Box>
                          </Typography>
                        </Grid>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleMenuClose()
                          handleDeletePostOpen()
                        }}
                      >
                        <Grid container alignItems="center">
                          <DeleteOutlineIcon
                            color="error"
                            fontSize="small"
                            style={{ marginRight: 8 }}
                          />
                          <Typography color="error">
                            <Box fontWeight={500}>Delete Post</Box>
                          </Typography>
                        </Grid>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Grid>
              )}
            </Grid>

            {postData.place && (
              <CardContent>
                <Grid container>
                  <Box display="inline">
                    <LocationOnIcon color="secondary" />
                  </Box>
                  <Link
                    color="textPrimary"
                    underlined
                    href="/place/[shortId]/[urlSlug]"
                    as={`/place/${postData.place.shortId}/${postData.place.urlSlug}`}
                  >
                    <Typography color="textSecondary" display="inline" gutterBottom>
                      {postData.place.mapBox.place_name}
                    </Typography>
                  </Link>
                </Grid>
              </CardContent>
            )}

            {postData.contentRaw && (
              <CardContent>
                <Content post={postData} />
              </CardContent>
            )}

            {postData.gif && (
              <CardContent>
                <Card>
                  <ResizeObserver
                    onResize={({ width }) => {
                      setWidth(width)
                    }}
                  />

                  <Gif
                    borderRadius={0}
                    hideAttribution
                    onGifClick={(gif, e) => e.preventDefault()}
                    gif={postData.gif}
                    width={width}
                  />
                </Card>
              </CardContent>
            )}

            {postData.mediaFiles && (
              <CardContent>
                <Grid container spacing={1}>
                  {postData.mediaFiles.map(mediaFile => {
                    return (
                      <Grid key={mediaFile._id} item xs={6}>
                        <MediaFile mediaFile={mediaFile} />
                      </Grid>
                    )
                  })}
                </Grid>
              </CardContent>
            )}

            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography color="textSecondary">
                    <Grid container spacing={1} alignItems="center" justify="center">
                      <Grid item>
                        <IconButton size="small" onClick={handleLikeClick}>
                          <FavoriteBorderIcon color={isLiked ? 'secondary' : 'disabled'} />
                        </IconButton>
                      </Grid>
                      <Grid item>{postData.likes.length}</Grid>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid item mr={2}>
                  <Typography color="textSecondary">
                    <Grid container spacing={1}>
                      <Grid item>
                        <IconButton size="small">
                          <ChatBubbleOutlineIcon color="primary" />
                        </IconButton>
                      </Grid>
                      <Grid item>{comments.length}</Grid>
                    </Grid>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Box></Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {/* main comment */}
          {isAuthenticated ? (
            <CommentForm
              postId={postData._id}
              comments={comments}
              setComments={setComments}
              handleSetNestedComments={handleSetNestedComments}
            />
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={2}>
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

      {/* Delete Dialog */}
      <Dialog maxWidth="xs" open={deletePostOpen} onClose={handleDeletePostClose}>
        <DialogTitle>Delete Post?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This can’t be undone and it will be removed from your profile, the post feed, and from
            search results.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeletePostClose} variant="contained">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteClick} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      {editPostOpen && (
        <PostForm
          post={postData}
          setPostData={setPostData}
          open={editPostOpen}
          handleClose={handleEditPostClose}
        />
      )}
    </>
  )
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
  commentsData: PropTypes.array.isRequired
}

export default PostDetails
