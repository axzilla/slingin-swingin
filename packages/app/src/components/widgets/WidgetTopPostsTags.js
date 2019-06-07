import React from 'react'
import Link from '../Link'

import { Card, CardContent, Typography, Box } from '@material-ui/core'

const WidgetTopPostsTags = ({ postTags }) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          <Box fontFamily="Monospace" fontWeight={900}>
            @beliebt
          </Box>
        </Typography>
        {postTags &&
          postTags.slice(0, 20).map((item, i) => {
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

export default WidgetTopPostsTags
