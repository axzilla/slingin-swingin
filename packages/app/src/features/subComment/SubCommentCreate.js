// Packages
import React, { useState } from 'react'

// Services
import { createSubComment } from './_services'

// Contexts
import { useAuth } from '../../contexts/auth'

// Material Styles
import { makeStyles } from '@material-ui/core/styles'

// Material Core
import {
  Grid,
  Button,
  TextField,
  FormControl,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
  IconButton
} from '@material-ui/core'

// Material Icons
import { Folder as FolderIcon, AddBox as AddBoxIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}))

const SubCommentCreate = ({ comment, subComments, setSubComments }) => {
  const { auth } = useAuth()
  const classes = useStyles()

  const [subComment, setSubComment] = useState('')

  const onChange = e => {
    setSubComment(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    const subCommentData = {
      text: subComment,
      commentRef: comment._id
    }

    createSubComment(subCommentData).then(res => {
      const createdSubComment = res.data
      setSubComments([...subComments, createdSubComment])
    })

    setSubComment('')
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid item xs>
        <List>
          <ListItem>
            <ListItemAvatar>
              {auth.user.avatar ? (
                <Avatar
                  src={auth.user.avatar.secure_url}
                  aria-label="Recipe"
                  className={classes.avatar}
                />
              ) : (
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  {comment.user.username.substring(0, 1)}
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={
                <FormControl fullWidth error>
                  <TextField
                    label="Kommentieren ..."
                    margin="normal"
                    multiline
                    rowsMax="4"
                    variant="outlined"
                    value={subComment}
                    onChange={onChange}
                  />
                </FormControl>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" type="submit">
                <AddBoxIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </form>
  )
}

export default SubCommentCreate
