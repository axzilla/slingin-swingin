// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

// Local Components
import Content from './components/Content'
import TitleImage from './components/TitleImage'
import Footer from './components/Footer'

// Global Components
import UserAvatar from '@components/UserAvatar'
import Link from '@components/Link'

// MUI
import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles(theme => ({
  avatar: {
    border: `1px solid ${grey[900]}`
  },
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
    <Card variant="outlined">
      <TitleImage post={postData} />
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Link href="/[handle]" as={`/${post.user.username}`}>
            <UserAvatar user={post.user} />
          </Link>
        }
        title={
          <Link underlined href="/[handle]" as={`/${post.user.username}`}>
            {post.user.username}
          </Link>
        }
        subheader={
          <small>
            <Moment fromNow>{post.dateCreated}</Moment>
          </small>
        }
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
