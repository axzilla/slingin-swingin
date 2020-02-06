import React from 'react'
import PropTypes from 'prop-types'

import imagePlaceholder from './_placeholder.jpg'

import isEmpty from '@utils/isEmpty'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'

const useStyles = makeStyles(theme => ({
  media: { objectFit: 'cover' },
  addButton: { marginRight: theme.spacing(1) }
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
    <Card>
      <CardHeader title="Title Image" />
      <CardMedia
        component="img"
        alt="Post title"
        className={classes.media}
        height="auto"
        image={isEmpty(titleImagePreview) ? imagePlaceholder : titleImagePreview}
      />
      <CardActions>
        <input
          onChange={handlePostTitleImageChange}
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
        />
        <div className="icons">
          <label htmlFor="raised-button-file">
            <Button
              component="span"
              variant="contained"
              color="secondary"
              className={classes.addButton}
            >
              {isEmpty(titleImagePreview) ? 'Add' : 'Change'}
            </Button>
          </label>
          {!isEmpty(titleImagePreview) && (
            <Button color="primary" variant="outlined" onClick={handleDeleteTitleImageClick}>
              Remove
            </Button>
          )}
        </div>
      </CardActions>
    </Card>
  )
}

PostCreate.propTypes = {
  setTitleImage: PropTypes.func,
  titleImagePreview: PropTypes.string,
  setTitleImagePreview: PropTypes.func
}

export default PostCreate
