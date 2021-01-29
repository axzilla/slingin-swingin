// Packages
import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'

// Global Components
import Link from '@components/Link'

// MUI
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

function CommentFeedItemHeader({ comment, handleEditClick, handleDeleteDialog }) {
  const { isAuthenticated, currentUser } = useSelector(state => state.auth)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Grid container justify="space-between">
      <Grid item>
        <Link underlined href="/[username]" as={`/${comment.user.username}`}>
          <Typography variant="body2">@{comment.user.username}</Typography>
        </Link>
        <Typography variant="body2" color="textSecondary">
          <Moment fromNow>{comment.dateCreated}</Moment>
        </Typography>
      </Grid>
      {isAuthenticated && currentUser.id === comment.user._id && (
        <Grid item>
          <IconButton size="small" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose()
                handleEditClick()
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose()
                handleDeleteDialog()
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Grid>
      )}
    </Grid>
  )
}

CommentFeedItemHeader.propTypes = {
  comment: PropTypes.object.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteDialog: PropTypes.func.isRequired
}

export default CommentFeedItemHeader
