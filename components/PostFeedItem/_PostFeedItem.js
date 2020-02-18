import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import Content from './components/Content'
import TitleImage from './components/TitleImage'
import Footer from './components/Footer'

import Link from '@components/Link'

import { makeStyles } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles(theme => ({
  cardHeader: { paddingBottom: 0 },
  cardContentRoot: {
    '&:last-child': {
      paddingBottom: theme.spacing(1)
    }
  },
  media: { objectFit: 'cover' }
}))

function PostFeedItem({ post }) {
  const classes = useStyles()
  const [postData, setPostData] = useState(post)

  return (
    <Card elevation={3}>
      <TitleImage post={postData} />
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Link href="/[handle]" as={`/${post.user.username}`}>
            {post.user.avatar && post.user.avatar.secure_url ? (
              <Avatar alt={post.user.username} src={post.user.avatar.secure_url} />
            ) : (
              <Avatar alt={post.user.username}>
                {post.user.username.substring(0, 1).toUpperCase()}
              </Avatar>
            )}
          </Link>
        }
        title={
          <Link underlined href="/[handle]" as={`/${post.user.username}`}>
            {post.user.username}
          </Link>
        }
        subheader={<Moment fromNow>{post.dateCreated}</Moment>}
      />
      <CardContent classes={{ root: classes.cardContentRoot }}>
        <Content post={postData} />
        <Footer post={postData} setPostData={setPostData} />
      </CardContent>
    </Card>
  )
}

PostFeedItem.propTypes = {
  post: PropTypes.object
}

export default PostFeedItem
