import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { getPostsTags } from '../../features/post/_services'

import Link from '../Link'

import { Card, CardContent, Typography, Box } from '@material-ui/core'

function WidgetTopPostsTags() {
  const [postTags, setPostTags] = useState()

  useEffect(() => {
    getPostsTags().then(res => {
      setPostTags(res.data)
    })
  })

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          <Box fontFamily="Monospace" fontWeight={900}>
            @beliebt
          </Box>
        </Typography>
        {postTags &&
          postTags.slice(0, 20).map(item => {
            return (
              <Link key={item._id} to={`/posts/t/${item._id}`}>
                <Typography color="textSecondary" component="h3">
                  #{item._id}
                </Typography>
              </Link>
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
