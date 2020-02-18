import React, { useEffect, useState } from 'react'

import { getPostsTags } from '../../services/post'

import Link from '../../components/Link'
import Chip from '../../components/Chip'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

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
    <Card elevation={3}>
      <CardHeader title="Hot Topics" />
      <CardContent>
        {postTags &&
          postTags.slice(0, 25).map(item => {
            return (
              <Link key={item._id} href="/posts/t/[tag]" as={`/posts/t/${item._id}`}>
                <Chip clickable label={item._id} variant="outlined" />
              </Link>
            )
          })}
      </CardContent>
    </Card>
  )
}

export default WidgetTopPostsTags
