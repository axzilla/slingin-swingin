// Packages
import React from 'react'

// Material Core
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'

// Material Icons
import { Edit, Delete } from '@material-ui/icons'

const CommentFeedItemMenu = ({
  comment,
  onEditClick,
  onDeleteClick,
  handleMenuClose,
  anchorEl
}) => {
  const onMenuEditClick = () => {
    handleMenuClose()
    onEditClick()
  }

  const onMenuDeleteClick = commentId => {
    handleMenuClose()
    onDeleteClick(commentId)
  }

  return (
    <Menu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      getContentAnchorEl={null}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={onMenuEditClick}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText primary="Bearbeiten" />
      </MenuItem>
      <MenuItem onClick={() => onMenuDeleteClick(comment._id)}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText primary="Löschen" />
      </MenuItem>
    </Menu>
  )
}

export default CommentFeedItemMenu
