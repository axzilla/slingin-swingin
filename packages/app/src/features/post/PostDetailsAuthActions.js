// Packages
import React from 'react'
import { Link } from 'react-router-dom'

// Material Core
import { CardActions, Button, Divider } from '@material-ui/core'

const PostDetailsAuthActions = ({ post, auth, history }) => {
  const onDeleteClick = id => {
    if (
      window.confirm(
        'Bist du sicher, dass du diesen Beitrag löschen möchtest? Dieser Vorgang kann nicht rückgängig gemacht werden!'
      )
    ) {
      props.deletePost(id, history)
    }
  }

  return (
    <React.Fragment>
      {auth.isAuthenticated ? (
        <span>
          {post.user && auth.user.isVerified && post.user._id === auth.user.id ? (
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

export default PostDetailsAuthActions
