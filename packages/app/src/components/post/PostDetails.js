import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { useAuth } from '../../contexts/auth'
import { getPostByShortId, deletePost, handlePostLikes, handlePostBookmarks } from './_services'
import { getCommentsByPostRef } from '../comment/_services'
import { getSubCommentByPostRef } from '../subComment/_services'
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
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  chip: {
    borderRadius: '5px',
    marginBottom: '5px'
  }
})

function PostDetails({ match, history }) {
  const { auth } = useAuth()
  const classes = useStyles()
  const [isLoading, setIsloading] = useState(false)
  const [post, setPost] = useState([])
  const [commentsByPostRef, setCommentsByPostRef] = useState([])
  const [subCommentsByPostRef, setSubCommentsByPostRef] = useState([])

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    getInitialProps()
  }, [])

  async function getInitialProps() {
    setIsloading(true)

    try {
      const postByShortId = await getPostByShortId(match.params.postId).then(res => res.data)
      setPost(postByShortId)

      const commentsByPostRef = await getCommentsByPostRef(postByShortId._id).then(res => res.data)
      setCommentsByPostRef(commentsByPostRef)

      const subCommentsByPostRef = await getSubCommentByPostRef(postByShortId._id).then(
        res => res.data
      )
      setSubCommentsByPostRef(subCommentsByPostRef)
    } catch (err) {
      history.push('/not-found')
    }

    setIsloading(false)
  }

  function onLikeClick(id) {
    if (auth.isAuthenticated) {
      handlePostLikes(id).then(() => {
        getPostByShortId(match.params.postId).then(res => {
          setPost(res.data)
        })
      })
    } else {
      history.push('/login')
    }
  }

  function onBookmarkClick(id) {
    if (auth.isAuthenticated) {
      handlePostBookmarks(id).then(() => {
        getPostByShortId(match.params.postId).then(res => {
          setPost(res.data)
        })
      })
    } else {
      history.push('/login')
    }
  }

  let postContent

  if (isLoading) {
    postContent = <Spinner />
  } else if (post && post.user) {
    postContent = (
      <Grid item xs={12} sm={8}>
        <Grid>
          <Card>
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
                  <PostDetailsLikes post={post} auth={auth} onLikeClick={onLikeClick} />
                  <PostDetailsBookmarks post={post} auth={auth} onBookmarkClick={onBookmarkClick} />
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
            <CommentCreate
              postId={post._id}
              postShortId={post.shortId}
              setCommentsByPostRef={setCommentsByPostRef}
              commentsByPostRef={commentsByPostRef}
            />
          ) : null}
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          Kommentare ({commentsByPostRef.length + subCommentsByPostRef.length})
        </Typography>
        {commentsByPostRef &&
          commentsByPostRef.map(comment => {
            return (
              <CommentFeedItem
                key={comment._id}
                post={post}
                comment={comment}
                setCommentsByPostRef={setCommentsByPostRef}
                commentsByPostRef={commentsByPostRef}
              />
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

PostDetails.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}

export default PostDetails
