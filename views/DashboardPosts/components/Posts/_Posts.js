import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import AuthContext from '@contexts/AuthContext'
import { getPostsByUserId } from '@services/post'
import PostFeedItem from '@components/PostFeedItem'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function Posts() {
  const { user } = useContext(AuthContext)
  const [limit, setLimit] = useState(10)
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

  function loadMore() {
    setLimit(limit + 10)
  }

  const content = posts.slice(0, limit).map(post => <PostFeedItem key={post._id} post={post} />)

  return (
    <Grid>
      {isLoading ? (
        '...Loading'
      ) : (
        <>
          {content}
          {posts && content.length === posts.length ? null : (
            <Button onClick={loadMore} variant="outlined" color="primary">
              Mehr...
            </Button>
          )}
        </>
      )}
    </Grid>
  )
}

Posts.propTypes = { auth: PropTypes.object }

export default Posts
