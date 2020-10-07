// Packages
import React, { useState, useEffect } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Services
import { getPostsByUserBookmark } from '@services/post'

// Global Components
import PostFeedItem from '@components/PostFeedItem'

// MUI
import Grid from '@material-ui/core/Grid'

function Bookmarks() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSelector(state => state.auth)

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
