// Packages
import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import 'moment/locale/de'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { deleteSubComment } from './_services'

// Components
import Link from '../../components/Link'
import SubCommentEdit from './SubCommentEdit'
import SubCommentFeedItemAvatar from './SubCommentFeedItemAvatar'
import SubCommentFeedItemCreator from './SubCommentFeedItemCreator'
import SubCommentFeedItemDate from './SubCommentFeedItemDate'
import SubCommentFeedItemText from './SubCommentFeedItemText'
import SubCommentFeedItemButtons from './SubCommentFeedItemButtons'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Grid, Typography, IconButton } from '@material-ui/core'

// Material Icons
import { Edit, Delete } from '@material-ui/icons'

const useStyles = makeStyles({
  header: {
    marginBottom: '20px'
  },
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
    <>
      {!isEditMode ? (
        <Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.header}
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <SubCommentFeedItemAvatar subComment={subComment} />
                <Grid>
                  <SubCommentFeedItemCreator subComment={subComment} />
                  <SubCommentFeedItemDate subComment={subComment} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              {auth.isAuthenticated && subComment.user._id === auth.user.id ? (
                <SubCommentFeedItemButtons
                  subComment={subComment}
                  onDeleteClick={onDeleteClick}
                  onEditClick={onEditClick}
                />
              ) : null}
            </Grid>
          </Grid>
          <SubCommentFeedItemText subComment={subComment} />
        </Grid>
      ) : (
        <SubCommentEdit
          subComment={subComment}
          subComments={subComments}
          setSubComments={setSubComments}
          setIsEditMode={setIsEditMode}
        />
      )}
    </>
  )
}

export default SubCommentFeedItem
