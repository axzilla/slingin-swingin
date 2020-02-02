import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { getPostsTags } from '../../services/post'

import Link from '../../components/Link'
import Chip from '../../components/Chip'

import { Card, CardContent, CardHeader, Divider } from '@material-ui/core'

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
      <CardHeader title="Popular tags" />
      <Divider />
      <CardContent>
        {postTags &&
          postTags.slice(0, 20).map(item => {
            return (
              <Link key={item._id} href={`/posts/t/${item._id}`}>
                <Chip clickable label={item._id} variant="outlined" />
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
