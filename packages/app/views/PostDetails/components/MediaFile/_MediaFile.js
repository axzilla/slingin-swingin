// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// MUI
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

function MediaFile({ mediaFile }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia image={mediaFile.cloudinary.secure_url} onClick={() => setOpen(true)}>
            <Box height={125} />
          </CardMedia>
        </CardActionArea>
      </Card>

      <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Grid container justify="space-between" alignItems="center">
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
          <img
            src={mediaFile.cloudinary.secure_url}
            style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 62px)', objectFit: 'contain' }}
          />
        </Grid>
      </Dialog>
    </>
  )
}

MediaFile.propTypes = {
  mediaFile: PropTypes.object
}

export default MediaFile
