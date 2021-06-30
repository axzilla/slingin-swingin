// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { EditorState, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js'
import { useSelector } from 'react-redux'
import { Gif } from '@giphy/react-components'
import ResizeObserver from 'react-resize-observer'
import ObjectID from 'bson-objectid'

// import axios from 'axios'
// import _ from 'lodash'

// Local Components
// import { MediaFiles, GifDialog, PlaceDialog } from './components'
import { MediaFiles, GifDialog } from './components'

// DraftJs Utils
import {
  trimFirstAndLastBlock,
  removeEmptyBlocks,
  createLinkEntities,
  getEntities
} from '../DraftJsEditor/utils'

// DraftJs Plugins
import hashtagDecoratorPlugin from '../DraftJsEditor/plugins/hashtagDecoratorPlugin'
import linkDecoratorPlugin from '../DraftJsEditor/plugins/linkDecoratorPlugin'

// Global Components
import DraftJsEditor from '@components/DraftJsEditor'
import UserAvatar from '@components/UserAvatar'

// Services
import { postCreate, postUpdate } from '@services/post'
import { createMediaFiles, deleteMediaFiles } from '@services/mediaFile'

// MUI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import GifIcon from '@material-ui/icons/Gif'
import ImageIcon from '@material-ui/icons/Image'
// import LocationOnIcon from '@material-ui/icons/LocationOn'
import CloseIcon from '@material-ui/icons/Close'
import { DialogContent } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
// import Autocomplete from '@material-ui/lab/Autocomplete'
// import Typography from '@material-ui/core/Typography'
// import { TextField as MuiTextField } from '@material-ui/core'
// import DeleteIcon from '@material-ui/icons/Delete'

function PostForm({ post, setPostData, open, handleClose }) {
  const router = useRouter()
  const { currentUser } = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const [gif, setGif] = useState((post && post.gif) || null)
  // const [place, setPlace] = useState((post && post.place) || null)
  // const [places, setPlaces] = useState([])
  const [isGifDialogOpen, setIsGifDialogOpen] = useState(false)
  // const [isPlaceDialogOpen, setIsPlaceDialogOpen] = useState(false)
  const [mediaFilesPreview, setMediaFilesPreview] = useState([])
  const [mediaFilesUploaded, setMediaFilesUploaded] = useState([])
  const [mediaFilesToDelete, setMediaFilesToDelete] = useState([])
  const [mediaFilesPost] = useState(post && post.mediaFiles ? post.mediaFiles : [])
  // const [mediaPost, setMediaPost] = useState(post && post.mediaFiles ? post.mediaFiles : [])
  // const [setPlaces] = useState([])
  // const [places, setPlaces] = useState([])
  // const [place, setPlace] = useState((post && post.place) || {})
  // const [place] = useState((post && post.place) || {})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [objectId] = useState(ObjectID.generate())
  const [width, setWidth] = useState(window.innerWidth)

  const plugins = [linkDecoratorPlugin, hashtagDecoratorPlugin]
  const decorators = new CompositeDecorator(plugins)
  const [editorState, setEditorState] = useState(
    post && post.contentRaw
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(post.contentRaw)), decorators)
      : EditorState.createEmpty(decorators)
  )

  useEffect(() => {
    if (isSubmitted) {
      handleCreateOrUpdatePost()
      setMediaFilesUploaded([])
      setIsSubmitted(false)
    }

    function routeChangeStart() {
      !isSubmitted &&
        mediaFilesUploaded.length > 0 &&
        deleteMediaFiles({ mediaFiles: mediaFilesUploaded })
    }

    function beforeunload() {
      !isSubmitted &&
        mediaFilesUploaded.length > 0 &&
        deleteMediaFiles({ mediaFiles: mediaFilesUploaded })
    }

    window.addEventListener('beforeunload', beforeunload)
    router.events.on('routeChangeStart', routeChangeStart)

    return () => {
      window.removeEventListener('beforeunload', beforeunload)
      router.events.off('routeChangeStart', routeChangeStart)
    }
  }, [mediaFilesUploaded, isSubmitted])

  // async function handleGetPlaces(event) {
  //   try {
  //     if (event && event.target.value.length > 3) {
  //       const searchTerm = event.target.value
  //       const basePath = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
  //       const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  //       const types = 'region,place,locality'
  //       const { data } = await axios.get(
  //         `${basePath}/${searchTerm}.json?types=${types}&access_token=${token}`
  //       )

  //       setPlaces(data.features)
  //     }
  //   } catch (error) {
  //     if (error) throw error
  //   }
  // }

  function handleCloseFunctions() {
    !isSubmitted &&
      mediaFilesUploaded.length > 0 &&
      deleteMediaFiles({ mediaFiles: mediaFilesUploaded })

    handleClose()
  }

  async function handleCreateOrUpdatePost() {
    try {
      setIsLoading(true)
      const editorHasContent = editorState.getCurrentContent().getPlainText().length > 0

      let hashtags
      let contentRaw
      let data
      let contentText

      if (editorHasContent) {
        const newEditorState = createLinkEntities(
          trimFirstAndLastBlock(removeEmptyBlocks(editorState))
        )

        hashtags = getEntities(newEditorState, 'HASHTAG').map(hashtag => hashtag.data.hashtag)
        contentRaw = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()))
        contentText = newEditorState.getCurrentContent().getPlainText().replace(/\s+/g, ' ').trim()
        // data = { contentRaw, contentText, hashtags, gif, place: (place && place._id) || null }
        data = { contentRaw, contentText, hashtags, gif }
      } else {
        data = {
          contentRaw: '',
          contentText: '',
          hashtags: [],
          gif
          // place: (place && place._id) || null
        }
      }

      if (mediaFilesToDelete.length > 0) {
        deleteMediaFiles({ mediaFiles: mediaFilesToDelete })
        data.mediaFiles = mediaFilesPost.filter(mediaFilePost => {
          return !mediaFilesToDelete
            .map(mediaFileToDelete => mediaFileToDelete._id)
            .includes(mediaFilePost._id)
        })
      }

      if (mediaFilesUploaded.length > 0) {
        data.mediaFiles = [
          ...mediaFilesPost.filter(mediaFilePost => {
            return !mediaFilesToDelete
              .map(mediaFileToDelete => mediaFileToDelete._id)
              .includes(mediaFilePost._id)
          }),
          ...mediaFilesUploaded
        ]
      }

      if (post) {
        data._id = post._id
        const { data: updatedPost } = await postUpdate(data)
        setPostData(updatedPost)
        handleClose()
        setIsLoading(false)
      } else if (!post) {
        const objectId = ObjectID.generate()
        data._id = objectId
        const { data: createdPost } = await postCreate(data)
        handleClose()
        setIsLoading(false)
        router.push(`/post/${createdPost._id}`)
      }
    } catch (error) {
      setIsLoading(false)
      if (error) throw error
    }
  }

  async function onFileChange(e) {
    setIsLoading(true)

    const formData = new FormData()

    for (let i = 0; i < e.target.files.length; i++) {
      const mediaFile = e.target.files[i]
      setMediaFilesPreview(prevState => [...prevState, mediaFile])
      formData.append('mediafile', mediaFile)
    }

    formData.append('referenceType', 'post')
    formData.append('postId', objectId)
    const uploadedMediaFiles = await createMediaFiles(formData)
    setMediaFilesPreview([])

    setMediaFilesUploaded(prevState => [...prevState, ...uploadedMediaFiles.data])
    setIsLoading(false)
  }

  async function onFileDelete(mediaFile) {
    setIsLoading(true)
    const deletedMediaFile = await deleteMediaFiles({ mediaFiles: [mediaFile] })

    const index = mediaFilesUploaded
      .map(mediaFileUploaded => mediaFileUploaded._id)
      .indexOf(deletedMediaFile.data[0]._id)

    setMediaFilesUploaded([
      ...mediaFilesUploaded.slice(0, index),
      ...mediaFilesUploaded.slice(index + 1)
    ])

    setIsLoading(false)
  }

  async function handleSetMediaToDelete(image) {
    setMediaFilesToDelete([...mediaFilesToDelete, image])
  }

  return (
    <>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={!isLoading && handleCloseFunctions}>
        <DialogTitle>
          <Grid container justify="space-between" alignItems="center">
            <UserAvatar hideOnlineStatus user={currentUser} height={50} width={50} />
            <IconButton disabled={isLoading} onClick={handleCloseFunctions} size="small">
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <DraftJsEditor
                    placeholder="What's on your mind?"
                    maxHeight={400}
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                </Grid>
                {/* <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              Location
            </Typography>
            <Autocomplete
              fullWidth
              disableClearable
              freeSolo
              value={post && post.place ? post.place.mapBox : null}
              onInputChange={_.debounce(handleGetPlaces, 1000)}
              onChange={(event, place) => {
                setPlace({
                  mapBox: place
                })
              }}
              options={places}
              getOptionLabel={option => option.place_name}
              renderInput={params => (
                <MuiTextField
                  {...params}
                  onChange={event => {
                    if (event.target.value.length < 1) {
                      setPlace(null)
                      setPlaces([])
                    }
                  }}
                  color="secondary"
                  variant="outlined"
                />
              )}
            />
          </Grid> */}

                <Grid item xs={12}>
                  {gif && (
                    <Card style={{ position: 'relative' }}>
                      <ResizeObserver
                        onResize={({ width }) => {
                          setWidth(width)
                        }}
                      />
                      <Gif
                        borderRadius={0}
                        hideAttribution
                        onGifClick={(gif, e) => e.preventDefault()}
                        gif={gif}
                        width={width}
                      />
                      <Box p={2} position="absolute" top={0} right={0}>
                        <Fab disabled={isLoading} onClick={() => setGif(null)} size="small">
                          <DeleteIcon size="small" />
                        </Fab>
                      </Box>
                    </Card>
                  )}
                </Grid>
                {(mediaFilesPreview.length > 0 ||
                  mediaFilesUploaded.length > 0 ||
                  mediaFilesPost.length > 0) && (
                  <Grid item>
                    <MediaFiles
                      isLoading={isLoading}
                      onFileDelete={onFileDelete}
                      handleSetMediaToDelete={handleSetMediaToDelete}
                      mediaFilesPreview={mediaFilesPreview}
                      mediaFilesPost={mediaFilesPost}
                      mediaFilesUploaded={mediaFilesUploaded}
                      mediaFilesToDelete={mediaFilesToDelete}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions style={{ padding: '16px 24px' }}>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center" justify="space-between">
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <input
                      disabled={isLoading || gif}
                      onChange={onFileChange}
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      type="file"
                      multiple
                    />
                    <div className="icons">
                      <label htmlFor="raised-button-file">
                        <IconButton
                          disabled={isLoading || gif}
                          color="primary"
                          size="small"
                          component="span"
                          variant="contained"
                        >
                          <ImageIcon />
                        </IconButton>
                      </label>
                    </div>
                  </Grid>
                  <Grid item>
                    <IconButton
                      disabled={
                        isLoading ||
                        (mediaFilesPost.length > 0 &&
                          !mediaFilesPost.every(mediaFilePost => {
                            return mediaFilesToDelete
                              .map(mediaFileToDelete => mediaFileToDelete._id)
                              .includes(mediaFilePost._id)
                          })) ||
                        mediaFilesPreview > 0 ||
                        mediaFilesUploaded.length > 0
                      }
                      onClick={() => setIsGifDialogOpen(true)}
                      color="primary"
                      size="small"
                      variant="contained"
                    >
                      <GifIcon />
                    </IconButton>
                  </Grid>
                  {/* <Grid item>
                    <IconButton
                      disabled={isLoading}
                      color="primary"
                      size="small"
                      variant="contained"
                      onClick={() => setIsPlaceDialogOpen(true)}
                    >
                      <LocationOnIcon />
                    </IconButton>
                  </Grid> */}
                </Grid>
              </Grid>

              <Grid item>
                <Button
                  disabled={isLoading || (!editorState.getCurrentContent().hasText() && !gif)}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setIsSubmitted(true)
                  }}
                >
                  {post ? 'Save' : 'Post'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>

        {isLoading && (
          <LinearProgress
            color="secondary"
            style={{ width: '100%', position: 'absolute', bottom: 0 }}
          />
        )}
      </Dialog>

      {isGifDialogOpen && (
        <GifDialog
          setGif={setGif}
          isGifDialogOpen={isGifDialogOpen}
          setIsGifDialogOpen={setIsGifDialogOpen}
        />
      )}

      {/* {isPlaceDialogOpen && (
        <PlaceDialog
          isPlaceDialogOpen={isPlaceDialogOpen}
          setIsPlaceDialogOpen={setIsPlaceDialogOpen}
          place={place}
          setPlace={setPlace}
          places={places}
          setPlaces={setPlaces}
        />
      )} */}
    </>
  )
}

PostForm.propTypes = {
  post: PropTypes.object,
  setPostData: PropTypes.func,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default PostForm
