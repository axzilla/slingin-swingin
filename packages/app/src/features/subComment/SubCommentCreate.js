// Packages
import React, { useState } from 'react'

// Services
import { createSubComment } from './_services'

// Components
// Components
import MarkdownEditor from '../common/MarkdownEditor'

// Contexts
import { useAuth } from '../../contexts/auth'

// Material Styles
import { makeStyles } from '@material-ui/core/styles'

// Material Core
import {
  Card,
  CardContent,
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
      refComment: comment._id
    }

    createSubComment(subCommentData).then(res => {
      const createdSubComment = res.data
      setSubComments([...subComments, createdSubComment])
    })

    setSubComment('')
  }

  return (
    <form onSubmit={onSubmit}>
      <MarkdownEditor
        withPreview
        text={subComment}
        setText={setSubComment}
        onChange={onChange}
        value={subComment}
      />

      <Button type="submit" variant="outlined" color="primary">
        Kommentar &nbsp;
        <i className="fas fa-plus-circle" />
      </Button>
    </form>
  )
}

export default SubCommentCreate
