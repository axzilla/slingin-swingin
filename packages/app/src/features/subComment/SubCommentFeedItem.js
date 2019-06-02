// Packages
import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import 'moment/locale/de'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { deleteSubComment } from './_services'
import SubCommentEdit from './SubCommentEdit'

// Components
import Link from '../../components/Link'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import {
  Grid,
  Button,
  Avatar,
  Typography,
  IconButton,
  TextField,
  FormControl,
  Divider
} from '@material-ui/core'

// Material Icons
import { Edit, Delete } from '@material-ui/icons'

const useStyles = makeStyles({
  text: {
    marginBottom: '10px'
  },
  inlineTypo: {
    display: 'block'
  }
})

const SubCommentFeedItem = ({ subComment, subComments, setSubComments }) => {
  const { auth } = useAuth()
  const classes = useStyles()
  const [isEditMode, setIsEditMode] = useState(false)

  const onDeleteClick = subCommentId => {
    if (window.confirm('Kommentar löschen?')) {
      deleteSubComment(subCommentId).then(res => {
        const deletedSubComment = res.data

        const index = subComments.indexOf(
          subComments.filter(subComment => {
            return subComment._id === deletedSubComment._id
          })[0]
        )

        setSubComments([
          ...subComments.slice(0, index),
          ...subComments.slice(index + 1)
        ])
      })
    }
  }

  const onEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <Grid>
      {!isEditMode ? (
        <>
          <Typography className={classes.text}>{subComment.text}</Typography>
          <Link to={`/${subComment.user.username}`}>
            <Typography variant="caption" className={classes.inlineTypo}>
              {subComment.user.username}
            </Typography>
          </Link>
          <Typography variant="caption" className={classes.inlineTypo}>
            <Moment format="D MMM YYYY" locale="de">
              {subComment.dateCreated}
            </Moment>
          </Typography>
          <Grid item>
            {auth.isAuthenticated && subComment.user._id === auth.user.id ? (
              <React.Fragment>
                <IconButton onClick={onEditClick}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDeleteClick(subComment._id)}>
                  <Delete />
                </IconButton>
              </React.Fragment>
            ) : null}
          </Grid>
        </>
      ) : (
        <SubCommentEdit
          subComment={subComment}
          subComments={subComments}
          setSubComments={setSubComments}
          setIsEditMode={setIsEditMode}
        />
      )}
    </Grid>
  )
}

export default SubCommentFeedItem
