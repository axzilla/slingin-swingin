// Packages
import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'

// Actions
import {
  getPostByShortId,
  deletePost,
  handlePostLikes,
  handlePostBookmarks
} from './_services'
import { getCommentsByPostRef } from './../comment/_services'

// Features
import Spinner from '../common/Spinner'
import CommentCreate from '../comment/CommentCreate'
import CommentFeedItem from '../comment/CommentFeedItem'
import PostDetailsType from './PostDetailsType'
import PostDetailsTitle from './PostDetailsTitle'
import PostDetailsTags from './PostDetailsTags'
import PostDetailsTitleImage from './PostDetailsTitleImage'
import PostDetailsAvatar from './PostDetailsAvatar'
import PostDetailsCreator from './PostDetailsCreator'
import PostDetailsDate from './PostDetailsDate'
import PostDetailsLikes from './PostDetailsLikes'
import PostDetailsBookmarks from './PostDetailsBookmarks'
import PostDetailsAuthActions from './PostDetailsAuthActions'
import PostDetailsContent from './PostDetailsContent'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Card, CardContent, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  chip: {
    borderRadius: '5px',
    marginBottom: '5px'
  }
})

const PostDetails = props => {
  const classes = useStyles()

  const { isLoading, post } = props.post
  const { commentsByPostRef } = props.comments
  const {
    auth,
    deletePost,
    handlePostBookmarks,
    handlePostLikes,
    history
  } = props

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    props.getPostByShortId(props.match.params.postId)
    props.getCommentsByPostRef(props.match.params.postId)
  }, [])

  let postContent

  if (isLoading) {
    postContent = <Spinner />
  } else if (post && post.user) {
    postContent = (
      <Grid item xs={12} sm={8}>
        <Grid>
          <Card style={{ marginBottom: '20px' }}>
            <PostDetailsTitleImage post={post} />
            <CardContent>
              <div style={{ width: '100%' }}>
                <PostDetailsType post={post} classes={classes} />
                <PostDetailsTitle post={post} />
                <PostDetailsTags post={post} />
                <div style={{ margin: '30px 0' }}>
                  <PostDetailsAvatar post={post} />
                  <PostDetailsCreator post={post} />
                  <Typography style={{ display: 'inline' }}> - </Typography>
                  <PostDetailsDate post={post} />
                </div>
                <PostDetailsContent post={post} />
                <div style={{ display: 'flex' }}>
                  <PostDetailsLikes
                    post={post}
                    auth={auth}
                    handlePostLikes={handlePostLikes}
                  />
                  <PostDetailsBookmarks
                    post={post}
                    auth={auth}
                    handlePostBookmarks={handlePostBookmarks}
                  />
                </div>
              </div>
            </CardContent>
            <PostDetailsAuthActions
              post={post}
              auth={auth}
              deletePost={deletePost}
              history={history}
            />
          </Card>
        </Grid>
        <Grid style={{ marginBottom: '50px' }}>
          {auth.isAuthenticated && auth.user.isVerified ? (
            <CommentCreate postId={post._id} postShortId={post.shortId} />
          ) : null}
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          Kommentare ({commentsByPostRef.length})
        </Typography>
        {commentsByPostRef.map((mainComment, i) => {
          return (
            <React.Fragment key={mainComment._id}>
              {!mainComment.refCommentId ? (
                <CommentFeedItem key={i} post={post} comment={mainComment} />
              ) : null}
              {commentsByPostRef
                .filter(subComment => {
                  return subComment.refCommentId === mainComment._id
                })
                .map(subComment => {
                  return (
                    <CommentFeedItem
                      key={i}
                      post={post}
                      comment={subComment}
                      isSubcomment={true}
                    />
                  )
                })}
            </React.Fragment>
          )
        })}
      </Grid>
    )
  }

  return (
    <Grid container justify="center">
      {postContent}
    </Grid>
  )
}

const mapStateToProps = ({ auth, post, comments }) => ({ auth, post, comments })

const mapDispatchToProps = {
  getPostByShortId,
  getCommentsByPostRef,
  deletePost,
  handlePostLikes,
  handlePostBookmarks
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
