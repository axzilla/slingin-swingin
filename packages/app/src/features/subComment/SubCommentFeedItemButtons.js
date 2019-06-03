// Packages
import React from 'react'

// Material Core
import { IconButton } from '@material-ui/core'

// Material Icons
import { Edit, Delete } from '@material-ui/icons'

const SubCommentFeedItemButton = ({
  subComment,
  onEditClick,
  onDeleteClick
}) => {
  return (
    <React.Fragment>
      <IconButton onClick={onEditClick}>
        <Edit />
      </IconButton>
      <IconButton onClick={() => onDeleteClick(subComment._id)}>
        <Delete />
      </IconButton>
    </React.Fragment>
  )
}

export default SubCommentFeedItemButton
