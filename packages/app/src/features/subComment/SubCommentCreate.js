// Packages
import React, { useState } from 'react'

// Services
import { createSubComment } from './_services'

// Material Core
import { Grid, Button, TextField, FormControl } from '@material-ui/core'

const SubCommentCreate = ({ comment, subComments, setSubComments }) => {
  const [subComment, setSubComment] = useState('')

  const onChangeSubComment = e => {
    setSubComment(e.target.value)
  }

  const onCreateSubCommentClick = e => {
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
    <form onSubmit={onCreateSubCommentClick}>
      <FormControl fullWidth error>
        <TextField
          label="Kommentar hinzufügen"
          margin="normal"
          multiline
          variant="outlined"
          value={subComment}
          onChange={onChangeSubComment}
        />
      </FormControl>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Button type="submit" variant="outlined" color="primary">
          Kommentar &nbsp;
          <i className="fas fa-plus-circle" />
        </Button>
      </Grid>
    </form>
  )
}

export default SubCommentCreate
