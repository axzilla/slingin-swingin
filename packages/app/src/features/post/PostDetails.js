// Packages
import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import openSocket from 'socket.io-client'

// Contexts
import { useAuth } from '../../contexts/auth'

// Actions
import { getPostByShortId, deletePost, handlePostLikes, handlePostBookmarks } from './_services'
import { getCommentsByPostRef } from '../comment/_services'

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

const PostDetails = ({ match, history }) => {
  const { auth } = useAuth()
  const classes = useStyles()
  const [isLoading, setIsloading] = useState(false)
  const [post, setPost] = useState([])
  const [commentsByPostRef, setCommentsByPostRef] = useState([])
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    getInitialProps()
  }, [])

  // useEffect(() => {
  //   const socket = openSocket('http://localhost:5000')
  //   socket.on('comments', data => {
  //     if (data.action === 'create') {
  //       setCommentsByPostRef([data.comment, ...commentsByPostRef])
  //     }
  //   })
  // }, [commentsByPostRef])

  const getInitialProps = async () => {
    setIsloading(true)

    const postByShortId = await getPostByShortId(match.params.postId).then(res => res.data)
    setPost(postByShortId)

    const commentsByPostRef = await getCommentsByPostRef(postByShortId._id).then(res => res.data)
    setCommentsByPostRef(commentsByPostRef)

    setIsloading(false)
  }

  const onLikeClick = id => {
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

  const onBookmarkClick = id => {
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
              // history={history}
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
          Kommentare ({commentsByPostRef.length})
        </Typography>
        {commentsByPostRef &&
          commentsByPostRef.map((comment, i) => {
            return (
              <CommentFeedItem
                key={i}
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

export default PostDetails
