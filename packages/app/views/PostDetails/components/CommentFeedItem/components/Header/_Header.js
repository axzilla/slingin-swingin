// Packages
import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

// Global Components
import Link from '@components/Link'
import UserAvatar from '@components/UserAvatar'

// MUI
import CardHeader from '@material-ui/core/CardHeader'

function CommentFeedItemHeader({ comment }) {
  return (
    <CardHeader
      avatar={
        <Link href="/[username]" as={`/${comment.user.username}`}>
          <UserAvatar user={comment.user} />
        </Link>
      }
      title={
        <Link href="/[username]" as={`/${comment.user.username}`}>
          {comment.user.username}
        </Link>
      }
      subheader={<Moment fromNow>{comment.dateCreated}</Moment>}
    />
  )
}

CommentFeedItemHeader.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemHeader
