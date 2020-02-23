import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'

import EditorPost from '@components/EditorPost'
import { commentCreate, commentUpdate } from '@services/comment'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

function CommentForm({
  comment,
  postId,
  toggleAnswerMode,
  setComments,
  comments,
  setIsEditMode,
  setCommentData
}) {
  const [editorState, setEditorState] = useState(
    comment
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(comment.content)))
      : EditorState.createEmpty()
  )

  async function onSubmit(event) {
    try {
      event.preventDefault()

      if (comment) {
        const commentData = {
          content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
          commentId: comment._id,
          post: comment.post
        }

        setIsEditMode(false)
        const updatedComment = await commentUpdate(commentData)
        setCommentData(updatedComment.data)
      } else if (!comment) {
        const commentData = {
          content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
          postId
        }

        const createdComment = await commentCreate(commentData)
        await setComments([...comments, createdComment.data])

        toggleAnswerMode && toggleAnswerMode()
      }

      setEditorState(EditorState.createEmpty())
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Box mb={1}>
        <EditorPost
          editorState={editorState}
          setEditorState={setEditorState}
          placeholder="Leave a comment"
        />
      </Box>
      <Button type="submit" variant="outlined" color="primary">
        Leave a comment
      </Button>
    </form>
  )
}

CommentForm.propTypes = {
  postId: PropTypes.string,
  toggleAnswerMode: PropTypes.bool,
  comment: PropTypes.object,
  comments: PropTypes.array,
  setComments: PropTypes.func,
  setIsEditMode: PropTypes.func,
  setCommentData: PropTypes.func
}

export default CommentForm
