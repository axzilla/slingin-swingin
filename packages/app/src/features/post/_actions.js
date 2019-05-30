import { createAction } from 'redux-starter-kit'
import { searchFunc } from '../search/_actions'
import api from './_services'

export const setPost = createAction('setPost')
export const setPosts = createAction('setPosts')
export const setPostsByUserId = createAction('setPostsByUserId')
export const setPostsDraftByUserId = createAction('setPostsDraftByUserId')
export const setPostByBookmarkedUserId = createAction(
  'setPostByBookmarkedUserId'
)
export const setPostsByTag = createAction('setPostsByTag')
export const setPostsTags = createAction('setPostsTags')
export const setPostLoading = createAction('setPostLoading')
export const setPostErrors = createAction('setPostErrors')
export const clearPostErrors = createAction('clearPostErrors')

export const addPost = (postData, history) => dispatch => {
  dispatch(setPostLoading(true))
  api
    .addPost(postData)
    .then(res => {
      const { shortId, urlSlug } = res.data
      dispatch(setPostLoading(false))
      history.push(`/post/${shortId}/${urlSlug}`)
    })
    .catch(err => {
      dispatch(setPostLoading(false))
      dispatch(setPostErrors(err.response.data))
    })
}

export const editPost = (postData, history) => dispatch => {
  dispatch(setPostLoading(true))
  api
    .editPost(postData)
    .then(res => {
      const { shortId, urlSlug } = res.data
      dispatch(setPostLoading(false))
      history.push(`/post/${shortId}/${urlSlug}`)
    })
    .catch(err => {
      dispatch(setPostLoading(false))
      dispatch(setPostErrors(err.response.data))
    })
}

export const getPost = postId => dispatch => {
  api
    .getPost(postId)
    .then(res => {
      dispatch(setPost(res.data))
    })
    .catch(err => dispatch(setPost(null)))
}

export const getPosts = () => dispatch => {
  api
    .getPosts()
    .then(res => dispatch(setPosts(res.data)))
    .catch(err => dispatch(setPosts({})))
}

export const getPostByShortId = postId => async dispatch => {
  await api
    .getPostByShortId(postId)
    .then(res => {
      dispatch(setPost(res.data))
    })

    .catch(err => dispatch(setPost(null)))
}

export const getPostsByUserId = id => dispatch => {
  api
    .getPostsByUserId(id)
    .then(res => dispatch(setPostsByUserId(res.data)))
    .catch(err => dispatch(setPosts(null)))
}

export const getDraftPostsByUserId = id => dispatch => {
  api
    .getDraftPostsByUserId(id)
    .then(res => dispatch(setPostsDraftByUserId(res.data)))
    .catch(err => dispatch(setPostsDraftByUserId(null)))
}

export const getPostsByUserBookmark = userId => dispatch => {
  api
    .getPostsByUserBookmark(userId)
    .then(res => dispatch(setPostByBookmarkedUserId(res.data)))
    .catch(err => dispatch(setPosts(null)))
}

export const getPostsByTag = tag => dispatch => {
  api
    .getPostsByTag(tag)
    .then(res => dispatch(setPostsByTag(res.data)))
    .catch(err => dispatch(setPostsByTag(null)))
}

export const getPostsTags = () => dispatch => {
  api
    .getPostsTags()
    .then(res => dispatch(setPostsTags(res.data)))
    .catch(err => dispatch(setPostsTags(null)))
}

export const deletePost = (id, history) => dispatch => {
  api
    .deletePost(id)
    .then(() => history.push('/'))
    .catch(err => dispatch(setPostErrors(err.response.data)))
}

export const handlePostLikes = (
  location,
  postId,
  userPostsId,
  searchString,
  profileBookmarkedUserId,
  shortId
) => dispatch => {
  api
    .handlePostLikes(postId)
    .then(res => {
      if (location === 'allPosts') {
        dispatch(getPosts())
      }
      if (location === 'postsByUserId') {
        dispatch(getPostsByUserId(userPostsId))
      }
      if (location === 'postsByUserBookmark') {
        dispatch(getPostsByUserBookmark(profileBookmarkedUserId))
      }
      if (location === 'getPostsBySearch' && searchString) {
        dispatch(searchFunc(searchString))
      }
      if (location === 'getPostByShortId') {
        dispatch(getPostByShortId(shortId))
      }
    })
    .catch(err => dispatch(setPostErrors(err.response.data)))
}

export const handlePostBookmarks = (
  location,
  postId,
  userPostsId,
  searchString,
  profileBookmarkedUserId,
  shortId
) => dispatch => {
  api
    .handlePostBookmarks(postId)
    .then(res => {
      if (location === 'allPosts') {
        dispatch(getPosts())
      }
      if (location === 'postsByUserId') {
        dispatch(getPostsByUserId(userPostsId)) &&
          dispatch(getPostsByUserBookmark(profileBookmarkedUserId))
      }
      if (location === 'postsByUserBookmark') {
        dispatch(getPostsByUserBookmark(profileBookmarkedUserId))
      }
      if (location === 'getPostsBySearch' && searchString) {
        dispatch(searchFunc(searchString))
      }
      if (location === 'getPostByShortId') {
        dispatch(getPostByShortId(shortId))
      }
    })
    .catch(err => dispatch(setPostErrors(err.response.data)))
}
