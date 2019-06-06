// Packages
import React, { useState, useEffect } from 'react'

// Components
import MarkdownEditor from '../common/MarkdownEditor'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import {
  Card,
  CardContent,
  Grid,
  FormControl,
  FormHelperText,
  Button,
  TextField,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles({
  formControl: {
    width: '100%'
  },
  error: {
    lineHeight: '20px',
    margin: '0'
  },
  passwordButton: {
    fontSize: '10px'
  },
  loginButton: {
    margin: '20px 0'
  },
  divider: {
    marginBottom: '10px'
  },
  quill: {
    marginTop: '20px'
  },
  button: {
    margin: '20px 0'
  },
  cardPreview: {
    background: 'transparent',
    marginBottom: '20px'
  }
})

const CommentEdit = ({ comments, comment, onSaveClick }) => {
  const classes = useStyles()
  const { errors } = comments

  const [text, setText] = useState('')

  useEffect(() => {
    setText(comment.text)
  }, [])

  const onChange = e => {
    setText(e.target.value)
  }

  return (
    <Grid className={classes.root} container justify="center">
      <FormControl className={classes.formControl} error>
        <form>
          <MarkdownEditor
            withPreview
            text={text}
            setText={setText}
            onChange={onChange}
            value={text}
          />

          <Button onClick={() => onSaveClick(text)} variant="outlined" color="primary">
            Speichern
          </Button>
        </form>
      </FormControl>
    </Grid>
  )
}

export default CommentEdit
