// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Global Components
import DraftJsEditor from '@components/DraftJsEditor'

// Services
import { commentCreate, commentUpdate } from '@services/comment'

// Utils
import rawToHtml from '@utils/rawToHtml'
import htmlRemove from '@utils/htmlRemove'

// DraftJs Utils
import {
  trimFirstAndLastBlock,
  removeEmptyBlocks,
  createLinkEntities,
  getEntities
} from '@components/DraftJsEditor/utils'

// DraftJs Plugins
import hashtagDecoratorPlugin from '../DraftJsEditor/plugins/hashtagDecoratorPlugin'
import linkDecoratorPlugin from '../DraftJsEditor/plugins/linkDecoratorPlugin'

// MUI
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  commentButton: { marginRight: theme.spacing(1) }
}))

function CommentForm({
  comment,
  postId,
  parentId,
  setComments,
  comments,
  setIsEditMode,
  setCommentData,
  handleIsCommentForm
}) {
  const { setAlert } = useAlert()
  const classes = useStyles()

  const plugins = [linkDecoratorPlugin, hashtagDecoratorPlugin]
  const decorators = new CompositeDecorator(plugins)
  const [editorState, setEditorState] = useState(
    comment
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(comment.contentRaw)), decorators)
      : EditorState.createEmpty(decorators)
  )

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const newEditorState = createLinkEntities(
        trimFirstAndLastBlock(removeEmptyBlocks(editorState))
      )

      const hashtags = getEntities(newEditorState, 'HASHTAG').map(hashtag => hashtag.data.hashtag)
      const contentRaw = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()))
      const contentText = newEditorState
        .getCurrentContent()
        .getPlainText()
        .replace(/\s+/g, ' ')
        .trim()

      // create main comment
      if (postId && !parentId && !comment) {
        const commentData = { contentRaw, contentText, postId, hashtags }

        const createdComment = await commentCreate(commentData)
        await setComments([...comments, createdComment.data])
        setAlert({ message: `Comment created successfully.`, variant: 'success' })
      }

      // create child comment
      if (parentId && !comment) {
        const commentData = { contentRaw, contentText, postId, parentId, hashtags }

        const createdComment = await commentCreate(commentData)
        await setComments([...comments, createdComment.data])
        setAlert({ message: `Comment created successfully.`, variant: 'success' })
      }

      // update comment
      if (comment && !postId && !parentId) {
        const commentData = { contentRaw, contentText, commentId: comment._id, hashtags }

        setIsEditMode(false)
        const updatedComment = await commentUpdate(commentData)
        setCommentData(updatedComment.data)
        setAlert({ message: `Comment updated successfully.`, variant: 'success' })
      }

      setEditorState(EditorState.createEmpty(decorators))
      handleIsCommentForm && handleIsCommentForm()
    } catch (error) {
      console.log(error.response.data) // eslint-disable-line no-console
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Box mb={1}>
        <DraftJsEditor
          editorState={editorState}
          setEditorState={setEditorState}
          placeholder="What are your thougts?"
        />
      </Box>
      <Button
        className={classes.commentButton}
        type="submit"
        variant="contained"
        color="secondary"
        disabled={
          htmlRemove(rawToHtml(JSON.stringify(convertToRaw(editorState.getCurrentContent()))))
            .length < 1
        }
      >
        {comment ? 'Save' : 'Comment'}
      </Button>
      {comment && (
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          onClick={() => setIsEditMode(false)}
        >
          Cancel
        </Button>
      )}
    </form>
  )
}

CommentForm.propTypes = {
  postId: PropTypes.string,
  parentId: PropTypes.string,
  comment: PropTypes.object,
  comments: PropTypes.array,
  setComments: PropTypes.func,
  setIsEditMode: PropTypes.func,
  setCommentData: PropTypes.func,
  handleIsCommentForm: PropTypes.func
}

export default CommentForm
