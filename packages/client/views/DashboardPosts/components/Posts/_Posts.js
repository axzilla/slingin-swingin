import React, { useState, useEffect, useContext } from 'react'

import AuthContext from '@contexts/AuthContext'
import { getPostsByUserId } from '@services/post'
import PostFeedItem from '@components/PostFeedItem'

import Grid from '@material-ui/core/Grid'

function Posts() {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
