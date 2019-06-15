import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../components/Link'
import { deletePost } from './_services'
import { CardActions, Button, Divider } from '@material-ui/core'

function PostDetailsAuthActions({ post, auth, history }) {
  const onDeleteClick = id => {
    if (
      window.confirm(
        'Bist du sicher, dass du diesen Beitrag löschen möchtest? Dieser Vorgang kann nicht rückgängig gemacht werden!'
      )
    ) {
      deletePost(id).then(() => history.push('/'))
    }
  }

  return (
    <React.Fragment>
      {auth.isAuthenticated ? (
        <span>
          {(post.user && auth.user.isVerified && post.user._id === auth.user.id) ||
          (auth.user.roles && auth.user.roles.isAdmin) ? (
            <React.Fragment>
              <Divider />
              <CardActions>
                <React.Fragment>
                  <Link to={`/edit-post/${post._id}`}>
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
  auth: PropTypes.object,
  history: PropTypes.object
}

export default PostDetailsAuthActions
