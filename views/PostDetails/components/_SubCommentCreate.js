import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { subCommentCreate } from '../../../services/subComment'
import { MarkdownEditor } from '../../../components'
import { Button } from '@material-ui/core'

function SubCommentCreate({ postId, comment, subComments, setSubComments }) {
  const [subComment, setSubComment] = useState('')

  function onChange(event) {
    setSubComment(event.target.value)
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const subCommentData = {
        text: subComment,
        refPost: postId,
        refComment: comment._id
      }

      const createdSubComment = await subCommentCreate(subCommentData)
      setSubComments([...subComments, createdSubComment.data])
      setSubComment('')
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <MarkdownEditor
        withPreview
        text={subComment}
        setText={setSubComment}
        onChange={onChange}
        value={subComment}
      />

      <Button type="submit" variant="outlined" color="primary">
        Kommentar &nbsp;
        <i className="fas fa-plus-circle" />
      </Button>
    </form>
  )
}

SubCommentCreate.propTypes = {
  postId: PropTypes.string,
  comment: PropTypes.object,
  subComments: PropTypes.array,
  setSubComments: PropTypes.func
}

export default SubCommentCreate