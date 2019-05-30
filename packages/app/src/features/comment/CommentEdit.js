// Packages
import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'

// Utils
import '../../utils/highlight'

// Assets
import { modules, formats } from '../quill/quill'
import '../../assets/css/quill.snow.css'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Grid, FormControl, FormHelperText, Button } from '@material-ui/core'

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
  }
})

const CommentEdit = ({ comments, comment, onSaveClick }) => {
  const classes = useStyles()
  const { errors } = comments

  const [text, setText] = useState('')

  useEffect(() => {
    setText(comment.text)
  }, [])

  const onReactQuillChange = e => {
    setText(e)
  }

  return (
    <Grid className={classes.root} container justify="center">
      <FormControl className={classes.formControl} error>
        <form>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={text}
            onChange={onReactQuillChange}
            error={errors.text}
          />
          {errors.text ? (
            <FormHelperText className={classes.error}>
              {errors.text}
            </FormHelperText>
          ) : null}
          <Button
            onClick={() => onSaveClick(text)}
            variant="outlined"
            color="primary"
          >
            Speichern
          </Button>
        </form>
      </FormControl>
    </Grid>
  )
}

export default CommentEdit
