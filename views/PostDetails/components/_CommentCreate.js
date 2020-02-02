import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextField from '../../../components/TextField'
import { commentCreate } from '../../../services/comment'

import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({})

function CommentCreate({ postId, toggleAnswerMode, setComments, comments }) {
  const classes = useStyles()
  const [text, setText] = useState('')
  const [errors, setErrors] = useState()

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const commentData = {
        text,
        postId
      }

      const createdComment = await commentCreate(commentData)
      await setComments([...comments, createdComment.data])
      toggleAnswerMode && toggleAnswerMode()
      setText('')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  function onChange(event) {
    setText(event.target.value)
  }

  return (
    <Grid className={classes.root} container justify="center">
      <form onSubmit={onSubmit}>
        <TextField
          error={errors && errors.text}
          placeholder="Write a comment"
          label="Write a comment"
          onChange={onChange}
          value={text}
        />
        <Button type="submit" variant="outlined" color="primary" disabled={text.length < 1}>
          Leave a comment
        </Button>
      </form>
    </Grid>
  )
}

CommentCreate.propTypes = {
  postId: PropTypes.string,
  toggleAnswerMode: PropTypes.bool,
  comments: PropTypes.array,
  setComments: PropTypes.func
}

export default CommentCreate
