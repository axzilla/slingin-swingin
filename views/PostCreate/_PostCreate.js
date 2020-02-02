import React, { useState } from 'react'
import Router from 'next/router'

import { postCreate } from '../../services/post'
import isEmpty from '../../utils/isEmpty'
import slugify from '../../utils/slugify'
import TextField from '../../components/TextField'
import Quill from '../../components/Quill'
import Container from '../../components/Container'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  chip: { margin: theme.spacing(0.5) },
  button: { margin: '20px 0' },
  media: { height: '140px' }
}))

function PostCreate() {
  const classes = useStyles()
  const [errors, setErrors] = useState()
  const [titleImage, setTitleImage] = useState(null)
  const [titleImagePreview, setTitleImagePreview] = useState(null)
  const [tagsInput, setTagsInput] = useState('')
  const [text, setText] = useState('')
  const [postData, setPostdata] = useState({
    title: '',
    type: '',
    tags: []
  })

  async function onSubmit() {
    try {
      const formData = new FormData()

      formData.append('titleImage', titleImage)
      formData.append('title', postData.title)
      formData.append('text', text)
      formData.append('tags', postData.tags)

      const res = await postCreate(formData)
      const createdPost = res.data
      const { shortId, urlSlug } = createdPost

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
      setTitleImage(null)
    }
  }

  function onChange(event) {
    setPostdata({
      ...postData,
      [event.target.name]: event.target.value
    })
  }

  async function onTextChange(value) {
    // value instead event.target.value - is quill specified
    setText(value)
  }

  function onTagsInputChange(event) {
    setTagsInput(slugify(event.target.value))
  }

  function onTagsKeyPress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (!postData.tags.includes(tagsInput) && !isEmpty(tagsInput)) {
        setPostdata({
          ...postData,
          tags: [...postData.tags, tagsInput]
        })
      }

      setTagsInput('')
    }
  }

  function handleTagDelete(i) {
    setPostdata({
      ...postData,
      tags: [...postData.tags.slice(0, i), ...postData.tags.slice(i + 1)]
    })
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
                Upload Title Image
              </Button>
            </label>
            <Button
              disableRipple
              style={{
                display: isEmpty(titleImagePreview) ? 'none' : 'inline'
              }}
              onClick={onDeleteTitleImageClick}
            >
              Remove Title Image
            </Button>
          </div>
          <TextField
            type="text"
            error={errors && errors.title}
            label="Title"
            name="title"
            value={postData.title}
            onChange={onChange}
          />
          <TextField
            error={errors && errors.tags}
            type="tags"
            label="Tags"
            name="tags"
            value={tagsInput}
            onChange={onTagsInputChange}
            onKeyDown={onTagsKeyPress}
          />
          <Grid>
            {postData.tags.map((tag, i) => {
              return (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleTagDelete(i)}
                  className={classes.chip}
                  color="primary"
                  variant="outlined"
                />
              )
            })}
          </Grid>
          <div>
            <Quill value={text} onChange={onTextChange} placeholder="Write your story..." />
          </div>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                className={classes.button}
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

export default PostCreate
