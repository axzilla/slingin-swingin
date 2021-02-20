// Packages
import PropTypes from 'prop-types'
// import axios from 'axios'

// MUI
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'

function MediaFiles({
  isLoading,
  onFileDelete,
  handleSetMediaToDelete,
  mediaFilesPreview,
  mediaFilesUploaded,
  mediaFilesPost,
  mediaFilesToDelete
}) {
  return (
    <>
      <Box mb={2}>
        <Grid container spacing={1}>
          {mediaFilesPost &&
            mediaFilesPost
              .filter(mediaFilePost => {
                return !mediaFilesToDelete
                  .map(mediaFileToDelete => mediaFileToDelete._id)
                  .includes(mediaFilePost._id)
              })
              .map(mediaFilePost => {
                return (
                  <Grid key={mediaFilePost.name} item xs={6}>
                    <Card>
                      <CardMedia image={mediaFilePost.cloudinary.secure_url}>
                        <Box height={125} position="relative">
                          <Box p={2} right={0} position="absolute">
                            <Fab
                              disabled={isLoading}
                              onClick={() => handleSetMediaToDelete(mediaFilePost)}
                              size="small"
                            >
                              <DeleteIcon size="small" />
                            </Fab>
                          </Box>
                        </Box>
                      </CardMedia>
                    </Card>
                  </Grid>
                )
              })}

          {mediaFilesUploaded &&
            mediaFilesUploaded.map(mediaFileUploaded => {
              return (
                <Grid key={mediaFileUploaded.name} item xs={6}>
                  <Card>
                    <CardMedia image={mediaFileUploaded.cloudinary.secure_url}>
                      <Box height={125} position="relative">
                        <Box p={2} right={0} position="absolute">
                          <Fab
                            disabled={isLoading}
                            onClick={() => onFileDelete(mediaFileUploaded)}
                            size="small"
                          >
                            <DeleteIcon size="small" />
                          </Fab>
                        </Box>
                      </Box>
                    </CardMedia>
                  </Card>
                </Grid>
              )
            })}

          {mediaFilesPreview &&
            mediaFilesPreview.map((mediaFilePreview, index) => {
              return (
                <Grid key={index} item xs={6}>
                  <Card>
                    <CardMedia image={URL.createObjectURL(mediaFilePreview)}>
                      <Box height={125} />
                    </CardMedia>
                  </Card>
                </Grid>
              )
            })}
        </Grid>
      </Box>
    </>
  )
}

MediaFiles.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onFileDelete: PropTypes.func.isRequired,
  handleSetMediaToDelete: PropTypes.func.isRequired,
  mediaFilesPreview: PropTypes.array.isRequired,
  mediaFilesPost: PropTypes.array.isRequired,
  mediaFilesUploaded: PropTypes.array.isRequired,
  mediaFilesToDelete: PropTypes.array.isRequired
}

export default MediaFiles
