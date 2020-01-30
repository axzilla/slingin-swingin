import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { getPostsTags } from '../../services/post'

import { NextLink } from '../../components'

import { Card, CardContent, Typography, Box } from '@material-ui/core'

function WidgetTopPostsTags() {
  const [postTags, setPostTags] = useState()

  useEffect(() => {
    getInitialData()
  }, [])

  async function getInitialData() {
    try {
      const foundPostTags = await getPostsTags()
      setPostTags(foundPostTags.data)
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          <Box fontFamily="Monospace" fontWeight={900}>
            @popular
          </Box>
        </Typography>
        {postTags &&
          postTags.slice(0, 20).map(item => {
            return (
              <NextLink key={item._id} href={`/posts/t/${item._id}`}>
                <Typography color="textSecondary" component="h3">
                  #{item._id}
                </Typography>
              </NextLink>
            )
          })}
      </CardContent>
    </Card>
  )
}

WidgetTopPostsTags.propTypes = {
  postTags: PropTypes.array
}

export default WidgetTopPostsTags
