// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import axios from 'axios'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateToMarkdown } from 'draft-js-export-markdown'
import _ from 'lodash'

// Local Components
import Title from './components/Title'
import TitleImage from './components/TitleImage'
import Tags from './components/Tags'

// Global Components
import DraftJsEditor from '@components/DraftJsEditor'

// Services
import { postCreate, postUpdate } from '@services/post'

// Utils
import rawToHtml from '@utils/rawToHtml'
import htmlRemove from '@utils/htmlRemove'

// MUI
import Autocomplete from '@material-ui/lab/Autocomplete'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { TextField as MuiTextField } from '@material-ui/core'

function PostForm({ post }) {
  const [errors, setErrors] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [titleImage, setTitleImage] = useState(null)
  const [titleImagePreview, setTitleImagePreview] = useState(
    post && post.titleImage ? post.titleImage.secure_url : null
  )
  const [title, setTitle] = useState(post ? post.title : '')
  const [locations, setLocations] = useState([])
  const [location, setLocation] = useState((post && post.location) || {})

  const [editorState, setEditorState] = useState(
    post
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(post.contentRaw)))
      : EditorState.createEmpty()
  )

  const [tags, setTags] = useState(post ? post.tags : [])
  const [tagsInput, setTagsInput] = useState('')

  async function handleGetPlaces(event) {
    try {
      if (event && event.target.value.length > 3) {
        const searchTerm = event.target.value
        const basePath = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        const types = 'region,place,locality'
        const { data } = await axios.get(
          `${basePath}/${searchTerm}.json?types=${types}&access_token=${token}`
        )

        setLocations(data.features)
      }
    } catch (error) {
      if (error) throw error
    }
  }

  async function onSubmit() {
    try {
      setIsLoading(true)
      const contentRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      const contentHtml = stateToHTML(editorState.getCurrentContent())
      const contentText = editorState.getCurrentContent().getPlainText().replace(/\s+/g, ' ').trim()
      const contentMarkdown = JSON.stringify(stateToMarkdown(editorState.getCurrentContent()))

      const formData = new FormData()
      formData.append('titleImage', titleImage)
      formData.append('title', title)
      formData.append('location', JSON.stringify(location))
      formData.append('contentRaw', contentRaw)
      formData.append('contentHtml', contentHtml)
      formData.append('contentText', contentText)
      formData.append('contentMarkdown', contentMarkdown)
      formData.append('tags', tags)

      if (post) {
        formData.append('_id', post._id)
      }

      if (post) {
        const res = await postUpdate(formData)
        const updatedPost = res.data
        const { shortId, urlSlug } = updatedPost
        Router.push(`/post/${shortId}/${urlSlug}`)
      } else if (!post) {
        const res = await postCreate(formData)
        const createdPost = res.data
        const { shortId, urlSlug } = createdPost
        Router.push(`/post/${shortId}/${urlSlug}`)
      }
    } catch (error) {
      setErrors(error.response.data)
    }
    setIsLoading(false)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TitleImage
              setTitleImage={setTitleImage}
              titleImagePreview={titleImagePreview}
              setTitleImagePreview={setTitleImagePreview}
            />
          </Grid>
          <Grid item>
            <Title title={title} setTitle={setTitle} errors={errors} />
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom>
              Content
            </Typography>
            <DraftJsEditor
              height={200}
              editorState={editorState}
              setEditorState={setEditorState}
              error={errors && errors.content}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              Location
            </Typography>
            <Autocomplete
              fullWidth
              disableClearable
              freeSolo
              value={post && post.location ? post.location.mapBox : null}
              onInputChange={_.debounce(handleGetPlaces, 1000)}
              onChange={(event, location) => {
                setLocation({
                  mapBox: location
                })
              }}
              options={locations}
              getOptionLabel={option => option.place_name}
              renderInput={params => (
                <MuiTextField
                  {...params}
                  onChange={event => {
                    if (event.target.value.length < 1) {
                      setLocation(null)
                      setLocations([])
                    }
                  }}
                  color="secondary"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom>
              Tags
            </Typography>
            <Tags
              tags={tags}
              setTags={setTags}
              tagsInput={tagsInput}
              setTagsInput={setTagsInput}
              errors={errors}
            />
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              onClick={onSubmit}
              fullWidth
              disabled={
                isLoading ||
                !title ||
                htmlRemove(rawToHtml(JSON.stringify(convertToRaw(editorState.getCurrentContent()))))
                  .length < 1
              }
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

PostForm.propTypes = {
  post: PropTypes.object
}

export default PostForm
