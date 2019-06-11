import React, { useState } from 'react'
import PropTypes from 'prop-types'

import MarkdownEditor from '../common/MarkdownEditor'

import { createComment } from './_services'

import { makeStyles } from '@material-ui/styles'
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
  button: {
    margin: '20px 0'
  },
  cardPreview: {
    background: 'transparent',
    marginBottom: '20px'
  }
})

function CommentCreate({ postId, toggleAnswerMode, commentsByPostRef, setCommentsByPostRef }) {
  const classes = useStyles()
  const [text, setText] = useState('')
  const [errors, setErrors] = useState()

  async function onSubmit(e) {
    e.preventDefault()

    const commentData = {
      text,
      refPost: postId
    }

    try {
      await createComment(commentData).then(res => {
        const createdComment = res.data
        setCommentsByPostRef([createdComment, ...commentsByPostRef])
      })

      toggleAnswerMode && toggleAnswerMode()

      setText('')
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  function onChange(e) {
    setText(e.target.value)
  }

  return (
    <Grid className={classes.root} container justify="center">
      <FormControl className={classes.formControl} error>
        <form onSubmit={onSubmit}>
          <MarkdownEditor withPreview setText={setText} onChange={onChange} value={text} />

          {errors && errors.text ? (
            <FormHelperText className={classes.error}>{errors.text}</FormHelperText>
          ) : null}
          <Button type="submit" variant="outlined" color="primary">
            Kommentar &nbsp;
            <i className="fas fa-plus-circle" />
          </Button>
        </form>
      </FormControl>
    </Grid>
  )
}

CommentCreate.propTypes = {
  postId: PropTypes.string,
  toggleAnswerMode: PropTypes.bool,
  commentsByPostRef: PropTypes.array,
  setCommentsByPostRef: PropTypes.func
}

export default CommentCreate
