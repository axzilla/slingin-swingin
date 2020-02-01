import React from 'react'
import PropTypes from 'prop-types'

import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'

import { Edit, Delete } from '@material-ui/icons'

function CommentFeedItemMenu({ comment, onEditClick, onDeleteClick, handleMenuClose, anchorEl }) {
  function onMenuEditClick() {
    handleMenuClose()
    onEditClick()
  }

  function onMenuDeleteClick(commentId) {
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
        <ListItemText primary="Delete" />
      </MenuItem>
    </Menu>
  )
}

CommentFeedItemMenu.propTypes = {
  comment: PropTypes.object,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  handleMenuClose: PropTypes.func,
  anchorEl: PropTypes.object
}

export default CommentFeedItemMenu
