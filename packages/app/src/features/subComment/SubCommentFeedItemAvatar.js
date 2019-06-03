// Packages
import React from 'react'

// Components
import Link from '../../components/Link'

// Assets
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

// Utils
import isEmpty from '../../utils/isEmpty'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles({
  avatar: {
    marginRight: '10px'
  }
})

const SubCommentFeedItemAvatar = ({ subComment }) => {
  const classes = useStyles()

  return (
    <Link to={`/${subComment.user.username}`}>
      <Avatar
        className={classes.avatar}
        src={
          isEmpty(subComment.user.avatar)
            ? avatarPlaceholder
            : subComment.user.avatar.secure_url
        }
      />
    </Link>
  )
}

export default SubCommentFeedItemAvatar
