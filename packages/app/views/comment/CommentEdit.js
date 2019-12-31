import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import MarkdownEditor from '../common/MarkdownEditor'

import { makeStyles } from '@material-ui/styles'
import { Grid, FormControl, Button } from '@material-ui/core'

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

function CommentEdit({ comment, onSaveClick }) {
  const classes = useStyles()
  const [text, setText] = useState('')

  useEffect(() => {
    setText(comment.text)
  }, [])

  function onChange(event) {
    setText(event.target.value)
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

CommentEdit.propTypes = {
  comment: PropTypes.string,
  onSaveClick: PropTypes.func
}

export default CommentEdit
