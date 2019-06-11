import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createSubComment } from './_services'
import MarkdownEditor from '../common/MarkdownEditor'
import { Button } from '@material-ui/core'

function SubCommentCreate({ comment, subComments, setSubComments }) {
  const [subComment, setSubComment] = useState('')

  function onChange(e) {
    setSubComment(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()

    const subCommentData = {
      text: subComment,
      refComment: comment._id
    }

    createSubComment(subCommentData).then(res => {
      const createdSubComment = res.data
      setSubComments([...subComments, createdSubComment])
    })

    setSubComment('')
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
  comment: PropTypes.object,
  subComments: PropTypes.array,
  setSubComments: PropTypes.func
}

export default SubCommentCreate
