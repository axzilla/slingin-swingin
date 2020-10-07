// Packages
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// Services
import { getPostsByUserId } from '@services/post'

// Global Components
import PostFeedItem from '@components/PostFeedItem'

// MUI
import Grid from '@material-ui/core/Grid'

function Posts() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    getInitalData()
  }, [])

  async function getInitalData() {
    setIsLoading(true)
    const foundPosts = await getPostsByUserId(user.id)
    await setPosts(foundPosts.data)
    setIsLoading(false)
  }

  return (
    <Grid container spacing={2}>
      {isLoading ? (
        '...Loading'
      ) : (
        <>
          {posts.map(post => (
            <Grid key={post._id} item xs={12}>
              <PostFeedItem post={post} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  )
}

export default Posts
