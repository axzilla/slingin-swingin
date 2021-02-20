// Packages
import { useEffect, useState } from 'react'

// Services
import { getPostsTags } from '../../services/post'

// Global Components
import Link from '@components/Link'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

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
    <Card variant="outlined">
      <CardHeader title="Trending" />
      <CardContent>
        {postTags &&
          postTags.slice(0, 25).map(item => {
            return (
              <Link
                color="textPrimary"
                underlined
                key={item._id}
                href="/posts/t/[tag]"
                as={`/posts/t/${item._id}`}
              >
                <Typography display="inline" variant="subtitle1">
                  <Box display="inline">{`#${item._id}`} </Box>
                </Typography>
              </Link>
            )
          })}
      </CardContent>
    </Card>
  )
}

export default WidgetTopPostsTags
