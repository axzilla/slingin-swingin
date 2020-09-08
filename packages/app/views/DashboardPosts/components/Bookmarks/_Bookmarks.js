import React, { useState, useEffect, useContext } from 'react'

import AuthContext from '@contexts/AuthContext'
import { getPostsByUserBookmark } from '@services/post'
import PostFeedItem from '@components/PostFeedItem'

import Grid from '@material-ui/core/Grid'

function Bookmarks() {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getInitalData()
  }, [])

  async function getInitalData() {
    setIsLoading(true)
    const foundPosts = await getPostsByUserBookmark(user.id)
    await setPosts(foundPosts.data)
    setIsLoading(false)
  }

  return (
    <Grid container spacing={2}>
      {isLoading
        ? '...Loading'
        : posts.map(post => (
            <Grid item xs={12} key={post._id}>
              <PostFeedItem post={post} />
            </Grid>
          ))}
    </Grid>
  )
}

export default Bookmarks
