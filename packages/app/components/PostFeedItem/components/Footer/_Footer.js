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
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
// import BookmarkIcon from '@material-ui/icons/Bookmark'

// function Footer({ post, setPostData }) {
function Footer({ post }) {
  // const dispatch = useDispatch()
  // const { user, isAuthenticated } = useSelector(state => state.auth)
  // const isBookmarked = post.bookmarks.includes(user.id)

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
    <Grid container alignItems="center" justify="space-between">
      <Grid>
        <Grid container alignItems="center">
          <Box mr={2}>
            <Typography color="textSecondary">{post.likes.length} likes</Typography>
          </Box>
          <Box mr={2}>
            <Typography color="textSecondary">{post.postComments.length} replies</Typography>
          </Box>
          <Typography color="textSecondary">{post.views} views</Typography>
        </Grid>
      </Grid>
      {/* <Grid item>
        <BookmarkIcon onClick={handleBookmarkClick} color={isBookmarked ? 'inherit' : 'disabled'} />
      </Grid> */}
    </Grid>
  )
}

Footer.propTypes = {
  post: PropTypes.object
  // setPostData: PropTypes.func
}

export default Footer
