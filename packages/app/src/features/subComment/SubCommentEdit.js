// Packages
import React, { useState, useEffect } from 'react'

// Services
import { updateSubComment } from './_services'

// Material Core
import { Grid, Button, TextField, FormControl } from '@material-ui/core'

const SubCommentEdit = ({
  subComment,
  subComments,
  setSubComments,
  setIsEditMode
}) => {
  const [text, setText] = useState('')

  useEffect(() => {
    setText(subComment.text)
  }, [])

  const onChange = e => {
    setText(e.target.value)
  }

  const onSubmit = async () => {
    const subCommentData = {
      text,
      subCommentId: subComment._id
    }

    setIsEditMode(false)

    await updateSubComment(subCommentData).then(res => {
      const updatedSubComment = res.data

      const index = subComments.indexOf(
        subComments.filter(subComment => {
          return subComment._id === updatedSubComment._id
        })[0]
      )

      setSubComments([
        ...subComments.slice(0, index),
        updatedSubComment,
        ...subComments.slice(index + 1)
      ])
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl fullWidth error>
        <TextField
          label="Kommentar bearbeiten"
          margin="normal"
          multiline
          variant="outlined"
          value={text}
          onChange={onChange}
        />
      </FormControl>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Button type="submit" variant="outlined" color="primary">
          Speichern
        </Button>
      </Grid>
    </form>
  )
}

export default SubCommentEdit
