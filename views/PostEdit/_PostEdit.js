import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

import { postUpdate, getPostById } from '@services/post'
import isEmpty from '@utils/isEmpty'
import slugify from '@utils/slugify'
import TextField from '@components/TextField'
import Quill from '@components/Quill'
import Container from '@components/Container'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles({
  button: { margin: '20px 0' },
  media: { height: '140px' }
})

function PostEdit({ id }) {
  const classes = useStyles()

  const [errors, setErrors] = useState()
  const [titleImage, setTitleImage] = useState(null)
  const [titleImagePreview, setTitleImagePreview] = useState(null)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [type, setType] = useState('')
  const [tags, setTags] = useState([])
  const [tagsInput, setTagsInput] = useState('')

  useEffect(() => {
    getInitialData()
  }, [])

  async function getInitialData() {
    try {
      const foundPost = await getPostById(id)

      setTitle(foundPost.data.title)
      setText(foundPost.data.text)
      setTags(foundPost.data.tags)
      setType(foundPost.data.type)
      setTitleImagePreview(foundPost.data.titleImage && foundPost.data.titleImage.secure_url)
    } catch (error) {
      if (error) throw error
    }
  }

  async function onSubmit() {
    try {
      const formData = new FormData()

      formData.append('id', id)
      formData.append('titleImage', titleImage)
      formData.append('title', title)
      formData.append('text', text)
      formData.append('tags', tags)
      formData.append('type', type)

      const res = await postUpdate(formData)
      const updatedPost = res.data
      const { shortId, urlSlug } = updatedPost
      Router.push(`/post/${shortId}/${urlSlug}`)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  function onPostTitleImageChange(event) {
    event.preventDefault()
    setTitleImagePreview(URL.createObjectURL(event.target.files[0]))
    setTitleImage(event.target.files[0])
  }

  function onDeleteTitleImageClick(event) {
    event.preventDefault()
    if (window.confirm('Delete picture?')) {
      setTitleImagePreview(null)
      setTitleImage('deleted')
    }
  }

  async function onTextChange(value) {
    // value instead event.target.value - is quill specified
    setText(value)
  }

  function onTitleChange(event) {
    setTitle(event.target.value)
  }

  function onTagsInputChange(event) {
    setTagsInput(slugify(event.target.value))
  }

  function onTagsKeyPress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (!tags.includes(tagsInput)) {
        setTags([...tags, tagsInput])
      }

      setTagsInput('')
    }
  }

  function handleTagDelete(i) {
    setTags([...tags.slice(0, i), ...tags.slice(i + 1)])
  }

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <img
            className={classes.media}
            src={isEmpty(titleImagePreview) ? '/post-title-placeholder.png' : titleImagePreview}
            alt="Titel"
          />
          <input
            onChange={onPostTitleImageChange}
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
          />
          <div className="icons">
            <label htmlFor="raised-button-file">
              <Button disableRipple component="span">
                <i className="far fa-edit fa-lg icon" />
              </Button>
            </label>
            <Button
              disableRipple
              style={{
                display: isEmpty(titleImagePreview) ? 'none' : 'inline'
              }}
              onClick={onDeleteTitleImageClick}
            >
              <i className="fas fa-trash-alt fa-lg icon" />
            </Button>
          </div>
          <TextField
            type="text"
            error={errors && errors.title}
            label="Titel"
            name="title"
            value={title}
            onChange={onTitleChange}
          />
          <TextField
            type="tags"
            error={errors && errors.tags}
            label="Hashtags"
            name="tags"
            value={tagsInput}
            onChange={onTagsInputChange}
            onKeyDown={onTagsKeyPress}
          />
          <Grid>
            {tags &&
              tags.map((tag, i) => {
                return (
                  <Chip
                    label={tag}
                    onDelete={() => handleTagDelete(i)}
                    className={classes.chip}
                    color="primary"
                    variant="outlined"
                    key={tag}
                  />
                )
              })}
          </Grid>
          <Grid>
            <Quill value={text} onChange={onTextChange} placeholder="Edit your story..." />
          </Grid>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                className={classes.button}
                type="submit"
                color="primary"
                variant="outlined"
                onClick={onSubmit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

PostEdit.propTypes = {
  id: PropTypes.string
}

export default PostEdit
