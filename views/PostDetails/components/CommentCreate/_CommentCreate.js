import React, { useState } from 'react'
import PropTypes from 'prop-types'

import htmlRemove from '@utils/htmlRemove'
import Editor from '@components/Editor'
import { commentCreate } from '@services/comment'

import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

function CommentCreate({ postId, toggleAnswerMode, setComments, comments }) {
  const [content, setContent] = useState('')
  async function onSubmit(event) {
    try {
      event.preventDefault()

      const commentData = {
        content,
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
    <Card>
      <CardHeader title={`Comments (${comments.length})`} />
      <Divider />
      <form onSubmit={onSubmit}>
        <CardContent>
          <Editor value={content} onChange={handleContentChange} />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            disabled={!htmlRemove(content).length}
          >
            Leave a comment
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

CommentCreate.propTypes = {
  postId: PropTypes.string,
  toggleAnswerMode: PropTypes.bool,
  comments: PropTypes.array,
  setComments: PropTypes.func
}

export default CommentCreate
