import React, { useState } from 'react'
import PropTypes from 'prop-types'

import htmlRemove from '@utils/htmlRemove'
import htmlToMarkdown from '@utils/htmlToMarkdown'
import Editor from '@components/Editor'
import { commentCreate } from '@services/comment'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

function CommentCreate({ postId, toggleAnswerMode, setComments, comments }) {
  const [content, setContent] = useState('')
  async function onSubmit(event) {
    try {
      event.preventDefault()

      const commentData = {
        content: htmlToMarkdown(content),
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

  async function handleContentChange(value) {
    // value instead event.target.value - is Quill editor specified
    setContent(value)
  }

  return (
    <form onSubmit={onSubmit}>
      <Box mb={1}>
        <Editor value={content} onChange={handleContentChange} />
      </Box>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        disabled={!htmlRemove(content).length}
      >
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
