// Packages
import React from 'react'

// Material Core
import { IconButton } from '@material-ui/core'

// Material Icons
import { Edit, Delete } from '@material-ui/icons'

const CommentFeedItemButtons = ({ comment, onEditClick, onDeleteClick }) => {
  return (
    <React.Fragment>
      <IconButton onClick={onEditClick}>
        <Edit />
      </IconButton>
      <IconButton onClick={() => onDeleteClick(comment._id)}>
        <Delete />
      </IconButton>
    </React.Fragment>
  )
}

export default CommentFeedItemButtons
