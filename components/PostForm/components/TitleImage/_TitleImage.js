import React from 'react'
import PropTypes from 'prop-types'

import imagePlaceholder from './_placeholder.jpg'

import isEmpty from '@utils/isEmpty'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  media: { objectFit: 'cover', marginBottom: theme.spacing(2) },
  button: { margin: theme.spacing(0, 1, 1, 0) }
}))

function PostCreate({ setTitleImage, titleImagePreview, setTitleImagePreview }) {
  const classes = useStyles()

  function handlePostTitleImageChange(event) {
    event.preventDefault()
    setTitleImagePreview(URL.createObjectURL(event.target.files[0]))
    setTitleImage(event.target.files[0])
  }

  function handleDeleteTitleImageClick(event) {
    event.preventDefault()
    setTitleImagePreview(null)
    setTitleImage('deleted')
  }

  return (
    <>
      {!isEmpty(titleImagePreview) && (
        <CardMedia
          component="img"
          alt="Post title"
          className={classes.media}
          height="auto"
          image={isEmpty(titleImagePreview) ? imagePlaceholder : titleImagePreview}
        />
      )}
      <input
        onChange={handlePostTitleImageChange}
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
      />
      <div className="icons">
        <label htmlFor="raised-button-file">
          <Button component="span" variant="contained" color="secondary" className={classes.button}>
            <AddAPhotoIcon />
          </Button>
        </label>
        {!isEmpty(titleImagePreview) && (
          <Button
            color="primary"
            variant="outlined"
            onClick={handleDeleteTitleImageClick}
            className={classes.button}
          >
            <DeleteIcon />
          </Button>
        )}
      </div>
    </>
  )
}

PostCreate.propTypes = {
  setTitleImage: PropTypes.func,
  titleImagePreview: PropTypes.string,
  setTitleImagePreview: PropTypes.func
}

export default PostCreate
