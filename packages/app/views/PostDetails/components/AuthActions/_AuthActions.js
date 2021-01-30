import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

import Link from '@components/Link'
import { postDelete } from '@services/post'

import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

function PostDetailsAuthActions({ post, currentUser, isAuthenticated }) {
  const [avatarOpen, setAvatarOpen] = React.useState(false)

  const handleAvatarOpen = () => {
    setAvatarOpen(true)
  }

  const handleAvatarClose = () => {
    setAvatarOpen(false)
  }

  async function handleDeleteClick() {
    try {
      await postDelete(post._id)
      Router.push('/')
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <span>
          {(post.user && post.user._id === currentUser._id) ||
          (currentUser.roles && currentUser.roles.isAdmin) ? (
            <React.Fragment>
              <Divider />
              <CardActions>
                <React.Fragment>
                  <Link href="/post-edit/[id]" as={`/post-edit/${post._id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button onClick={handleAvatarOpen}>Delete</Button>
                </React.Fragment>
              </CardActions>
            </React.Fragment>
          ) : null}
        </span>
      ) : null}

      <Dialog
        open={avatarOpen}
        onClose={handleAvatarClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post? This action can not be undone!
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleAvatarClose} color="secondary">
            No
          </Button>
          <Button onClick={handleDeleteClick} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

PostDetailsAuthActions.propTypes = {
  post: PropTypes.object,
  currentUser: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

export default PostDetailsAuthActions
