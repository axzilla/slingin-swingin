// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid as GiphyGrid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import ResizeObserver from 'react-resize-observer'

// MUI
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY)

function GifDialog({ setGif, isGifDialogOpen, setIsGifDialogOpen }) {
  const [width, setWidth] = useState(window.innerWidth)
  const [keyword, setKeyword] = useState()

  function fetchGifs(offset) {
    if (keyword) {
      return gf.search(keyword, { offset, limit: 10 })
    } else {
      return gf.trending({ offset, limit: 10 })
    }
  }

  return (
    <Dialog
      PaperProps={{ style: { height: '100%' } }}
      maxWidth="sm"
      fullWidth
      fullScreen
      open={isGifDialogOpen}
      onClose={() => setIsGifDialogOpen(false)}
    >
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center" spacing={2}>
          <Grid item xs>
            <TextField
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              autoFocus
              margin="dense"
              fullWidth
              variant="outlined"
              placeholder="Search for GIFs"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => setIsGifDialogOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <Grid container>
        <GiphyGrid
          key={keyword}
          hideAttribution
          onGifClick={(gif, e) => {
            e.preventDefault()
            setGif(gif)
            setIsGifDialogOpen(false)
          }}
          width={width}
          columns={3}
          gutter={6}
          fetchGifs={fetchGifs}
        />
        <ResizeObserver
          onResize={({ width }) => {
            setWidth(width)
          }}
        />
      </Grid>
    </Dialog>
  )
}

GifDialog.propTypes = {
  setGif: PropTypes.func.isRequired,
  isGifDialogOpen: PropTypes.bool.isRequired,
  setIsGifDialogOpen: PropTypes.func.isRequired
}

export default GifDialog
