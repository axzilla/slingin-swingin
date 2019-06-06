// Packages
import React, { useState } from 'react'
import Moment from 'react-moment'
import 'moment/locale/de'
import CodeBlock from '../common/CodeBlock'
import ReactMarkdown from 'react-markdown'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { deleteSubComment } from './_services'

// Assets
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

// Utils
import isEmpty from '../../utils/isEmpty'

// Components
import Link from '../../components/Link'
// import SubCommentEdit from './SubCommentEdit'
// import SubCommentFeedItemAvatar from './SubCommentFeedItemAvatar'
// import SubCommentFeedItemCreator from './SubCommentFeedItemCreator'
// import SubCommentFeedItemDate from './SubCommentFeedItemDate'
// import SubCommentFeedItemText from './SubCommentFeedItemText'
// import SubCommentFeedItemButtons from './SubCommentFeedItemButtons'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// // Material Colors
// import { blue } from '@material-ui/core/colors'

// Material Core
import {
  // List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}))

const SubCommentFeedItem = ({ subComment, subComments, setSubComments, index }) => {
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

        setSubComments([...subComments.slice(0, index), ...subComments.slice(index + 1)])
      })
    }
  }

  const onEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Link to={`/${subComment.user.username}`}>
            <Avatar
              alt={subComment.user.username}
              src={
                isEmpty(subComment.user.avatar)
                  ? avatarPlaceholder
                  : subComment.user.avatar.secure_url
              }
            />
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography>
              <ReactMarkdown
                source={subComment.text}
                escapeHtml={false}
                renderers={{ code: CodeBlock }}
              />
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Link to={`/${subComment.user.username}`}>
                <Typography component="span" variant="body2" className={classes.inline}>
                  {subComment.user.username}
                </Typography>
              </Link>
              {' — '}
              <Moment fromNow locale="de">
                {subComment.dateCreated}
              </Moment>
            </React.Fragment>
          }
        />
      </ListItem>
      {subComments.length !== index + 1 ? <Divider variant="inset" component="li" /> : null}
    </React.Fragment>
  )
}

export default SubCommentFeedItem
