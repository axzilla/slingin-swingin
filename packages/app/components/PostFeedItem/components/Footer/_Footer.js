// Packages
import React from 'react'
import PropTypes from 'prop-types'
// import { useDispatch, useSelector } from 'react-redux's

// Reduxe
// import { authModalReducer } from '@slices/authSlice'

// Services
// import { postToggleBookmarks } from '@services/post'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// import BookmarkIcon from '@material-ui/icons/Bookmark'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'

// function Footer({ post, setPostData }) {
function Footer({ post }) {
  // const dispatch = useDispatch()
  // const { user, isAuthenticated } = useSelector(state => state.auth)
  // const isBookmarked = post.bookmarks.includes(user._id)

  // async function handleBookmarkClick() {
  //   try {
  //     if (isAuthenticated) {
  //       const updatedPost = await postToggleBookmarks(post._id)
  //       setPostData(updatedPost.data)
  //     } else {
  //       dispatch(authModalReducer({ isOpen: true, type: 'SignUp' }))
  //     }
  //   } catch (error) {
  //     if (error) throw error
  //   }
  // }

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Typography color="textSecondary">
          <Grid container spacing={1}>
            <Grid item>
              {/* <IconButton size="small"> */}
              <FavoriteBorderIcon color="secondary" />
              {/* </IconButton> */}
            </Grid>
            <Grid item>{post.likes.length}</Grid>
          </Grid>
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="textSecondary">
          <Grid container spacing={1}>
            <Grid item>
              <ChatBubbleOutlineIcon color="primary" />
            </Grid>
            <Grid item>{post.postComments.length}</Grid>
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  )
}

Footer.propTypes = {
  post: PropTypes.object
  // setPostData: PropTypes.func
}

export default Footer
