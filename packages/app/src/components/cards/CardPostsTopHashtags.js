import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Link from '../../components/Link'

import { getPostsTags } from '../../features/post/_services'

import { Card, CardContent, Typography, Box } from '@material-ui/core'

const TopHashTagCard = props => {
  useEffect(() => {
    props.getPostsTags()
  }, [])

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          <Box fontFamily="Monospace" fontWeight={900}>
            @beliebt
          </Box>
        </Typography>
        {props.postTags.slice(0, 20).map((item, i) => {
          return (
            <Link key={i} to={`/posts/t/${item._id}`}>
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

const mapStateToProps = state => {
  const { postTags } = state.post
  return { postTags }
}

const mapDispatchToProps = {
  getPostsTags
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopHashTagCard)
