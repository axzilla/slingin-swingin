// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'

// Global Components
import UserAvatar from '@components/UserAvatar'

// Local Components
import DeleteDialog from './components/DeleteDialog'

// Utils
import rawToHtml from '@utils/rawToHtml'
import htmlToMui from '@utils/htmlToMui'

// Services
import { messageDelete, messageUpdate } from '@services/chats'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const useStyles = makeStyles({
  deleteIcon: { visibility: 'hidden' },
  rootGrid: { '&:hover $deleteIcon': { visibility: 'inherit' } }
})

const MessageItem = ({ message, receiver }) => {
  const { isDarkTheme } = useSelector(state => state.theme)
  const { user } = useSelector(state => state.auth)
  const classes = useStyles()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  useEffect(() => {
    if (!message.isSeen && message.receiver === user.id) {
      handleUpdateMessage()
    }
  }, [])

  const handleDeleteMessage = messageId => {
    setOpenDeleteDialog(false)
    messageDelete({ messageId })
  }

  const handleUpdateMessage = () => {
    messageUpdate({ message })
  }

  return (
    <Grid
      key={message._id}
      container
      alignItems="flex-start"
      justify={message.sender === receiver._id ? 'flex-start' : 'flex-end'}
      spacing={1}
      wrap="nowrap"
      className={classes.rootGrid}
    >
      {message.sender === receiver._id && (
        <Grid item>
          <UserAvatar user={receiver} height={28} width={28} />
        </Grid>
      )}
      <Grid item>
        {message.sender !== receiver._id && !message.isDeleted && (
          <>
            <IconButton
              size="small"
              className={classes.deleteIcon}
              onClick={() => setOpenDeleteDialog(true)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <DeleteDialog
              message={message}
              handleDeleteMessage={handleDeleteMessage}
              openDeleteDialog={openDeleteDialog}
              setOpenDeleteDialog={setOpenDeleteDialog}
            />
          </>
        )}
      </Grid>
      <Grid item>
        <Tooltip arrow title={<Moment format="MMM D, Y, HH:mm a">{message.dateCreated}</Moment>}>
          <Card
            style={{
              background:
                message.sender !== receiver._id
                  ? isDarkTheme
                    ? '#303030'
                    : '#bdbdbd'
                  : isDarkTheme
                  ? '#606060'
                  : '#ebebeb',
              boxShadow: 'none'
            }}
          >
            <CardContent style={{ padding: 10 }}>
              {!message.isDeleted ? (
                <div
                  dangerouslySetInnerHTML={{ __html: htmlToMui(rawToHtml(message.contentRaw)) }}
                />
              ) : (
                <Typography variant="overline" color="secondary">
                  Message&nbsp;deleted
                </Typography>
              )}
            </CardContent>
          </Card>
        </Tooltip>
      </Grid>
      <Grid item>
        {message.sender !== receiver._id &&
          (message.isSeen ? (
            <Tooltip
              title={
                <>
                  Seen <Moment format="MMM D, Y, HH:mm a">{message.dateIsSeen}</Moment>
                </>
              }
            >
              <CheckCircleOutlineIcon fontSize="small" color="secondary" />
            </Tooltip>
          ) : (
            <Tooltip title="Not seen yet">
              <CheckCircleOutlineIcon fontSize="small" />
            </Tooltip>
          ))}
      </Grid>
    </Grid>
  )
}

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  receiver: PropTypes.object.isRequired
}

export default MessageItem
