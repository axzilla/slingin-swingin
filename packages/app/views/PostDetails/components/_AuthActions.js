import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Link } from '../../../components'
import { postDelete } from '../../../services/post'
import { CardActions, Button, Divider } from '@material-ui/core'

function PostDetailsAuthActions({ post, user, isAuthenticated }) {
  async function onDeleteClick(id) {
    try {
      if (
        window.confirm(
          'Bist du sicher, dass du diesen Beitrag löschen möchtest? Dieser Vorgang kann nicht rückgängig gemacht werden!'
        )
      ) {
        await postDelete(id)
        Router.push('/')
      }
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <span>
          {(post.user && post.user._id === user.id) || (user.roles && user.roles.isAdmin) ? (
            <React.Fragment>
              <Divider />
              <CardActions>
                <React.Fragment>
                  <Link href={`/edit-post/${post._id}`}>
                    <Button color="primary">Bearbeiten</Button>
                  </Link>
                  <Button onClick={onDeleteClick.bind(this, post._id)} color="primary">
                    Löschen
                  </Button>
                </React.Fragment>
              </CardActions>
            </React.Fragment>
          ) : null}
        </span>
      ) : null}
    </React.Fragment>
  )
}

PostDetailsAuthActions.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

export default PostDetailsAuthActions
