// Packages
import React, { useState } from 'react'
import { connect } from 'react-redux'
import ReactQuill from 'react-quill'

// Utils
import '../../utils/highlight'

// Actions
import { createComment } from './_actions'

// Assets
import { modules, formats } from '../quill/quill'
import '../../assets/css/quill.snow.css'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Grid, FormControl, FormHelperText, Button } from '@material-ui/core'

const useStyles = makeStyles({
  formControl: {
    width: '100%'
  },
  error: {
    lineHeight: '20px',
    margin: '0'
  },
  passwordButton: {
    fontSize: '10px'
  },
  loginButton: {
    margin: '20px 0'
  },
  divider: {
    marginBottom: '10px'
  },
  quill: {
    marginTop: '20px'
  },
  button: {
    margin: '20px 0'
  }
})

const CommentCreate = ({
  comments,
  postId,
  postShortId,
  createComment,
  onCommentId,
  toggleAnswerMode
}) => {
  const classes = useStyles()

  const [text, setText] = useState('')

  const { errors } = comments

  const onSubmit = async e => {
    e.preventDefault()

    const commentData = {
      text,
      refPostId: postId,
      refPostShortId: postShortId,
      refCommentId: onCommentId
    }

    await createComment(commentData)
    toggleAnswerMode && toggleAnswerMode()
    setText('')
  }

  const onReactQuillChange = e => {
    setText(e)
  }

  return (
    <Grid className={classes.root} container justify="center">
      <FormControl className={classes.formControl} error>
        <form onSubmit={onSubmit}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={text}
            onChange={onReactQuillChange}
            error={errors.text}
          />
          {errors.text ? (
            <FormHelperText className={classes.error}>
              {errors.text}
            </FormHelperText>
          ) : null}
          <Button type="submit" variant="outlined" color="primary">
            Kommentar &nbsp;
            <i className="fas fa-plus-circle" />
          </Button>
        </form>
      </FormControl>
    </Grid>
  )
}

const mapStateToProps = ({ comments }) => ({ comments })

const mapDispatchToProps = {
  createComment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentCreate)
