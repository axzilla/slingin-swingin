import React, { useState } from 'react'
import PropTypes from 'prop-types'

import EditorPost from '@components/EditorPost'
import { commentCreate } from '@services/comment'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

function CommentCreate({ postId, toggleAnswerMode, setComments, comments }) {
  const [content, setContent] = useState('')

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const commentData = {
        content: JSON.stringify(content),
        postId
      }

      const createdComment = await commentCreate(commentData)
      await setComments([...comments, createdComment.data])

      toggleAnswerMode && toggleAnswerMode()
      setContent('')
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Box mb={1}>
        <EditorPost setContent={setContent} placeholder="Leave a comment" />
      </Box>
      <Button type="submit" variant="outlined" color="primary">
        Leave a comment
      </Button>
    </form>
  )
}

CommentCreate.propTypes = {
  postId: PropTypes.string,
  toggleAnswerMode: PropTypes.bool,
  comments: PropTypes.array,
  setComments: PropTypes.func
}

export default CommentCreate
