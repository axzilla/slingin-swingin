import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import MarkdownEditor from '../common/MarkdownEditor'

import { editPost, getPost } from './_services'
import isEmpty from '../../utils/isEmpty'
import slugify from '../../utils/slugify'

import placeholder from '../../assets/img/post-title-placeholder.png'

import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Chip
} from '@material-ui/core'

const useStyles = makeStyles({
  formControl: {
    width: '100%'
  },
  card: {
    maxWidth: '400px'
  },
  error: {
    lineHeight: '20px',
    display: 'inline',
    margin: '0'
  },
  passwordButton: {
    fontSize: '10px'
  },
  loginButton: {
    margin: '20px 0'
  },
  divider: {
    marginBottom: '10px'
  },
  quill: {
    marginTop: '20px'
  },
  button: {
    margin: '20px 0'
  },
  media: {
    height: '140px'
  }
})

function PostEdit({ match, history }) {
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
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    getPost(match.params.id).then(res => {
      const post = res.data

      setTitle(post.title)
      setText(post.text)
      setTags(post.tags)
      setType(post.type)
      setTitleImagePreview(post.titleImage && post.titleImage.secure_url)
    })
  }, [])

  async function onSubmit() {
    const formData = new FormData()
    formData.append('id', match.params.id)
    formData.append('titleImage', titleImage)
    formData.append('title', title)
    formData.append('text', text)
    formData.append('tags', tags)
    formData.append('type', type)

    try {
      const res = await editPost(formData)
      const updatedPost = res.data
      const { shortId, urlSlug } = updatedPost
      history.push(`/post/${shortId}/${urlSlug}`)
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  function onPostTitleImageChange(e) {
    e.preventDefault()
    setTitleImagePreview(URL.createObjectURL(e.target.files[0]))
    setTitleImage(e.target.files[0])
  }

  function onDeleteTitleImageClick(e) {
    e.preventDefault()
    if (window.confirm('Bild löschen?')) {
      setTitleImagePreview(null)
      setTitleImage('deleted')
    }
  }

  function onTextChange(e) {
    setText(e.target.value)
  }

  function onTitleChange(e) {
    setTitle(e.target.value)
  }

  function onTypeChange(e) {
    setType(e.target.value)
  }

  function onTagsInputChange(e) {
    setTagsInput(slugify(e.target.value))
  }

  function onTagsKeyPress(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
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
    <Grid className={classes.root} container justify="center">
      <Card>
        <CardContent>
          <img
            className={classes.media}
            src={isEmpty(titleImagePreview) ? placeholder : titleImagePreview}
            alt="Titel"
          />
          <Typography>*max 10MB</Typography>
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
          <FormControl className={classes.formControl} error>
            <TextField
              type="text"
              error={errors && errors.title ? true : false}
              label="Titel"
              margin="normal"
              variant="outlined"
              name="title"
              value={title}
              onChange={onTitleChange}
            />
            {errors && errors.title ? (
              <FormHelperText className={classes.error}>{errors.title}</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl className={classes.formControl} error>
            <MarkdownEditor
              withPreview
              value={text}
              onChange={onTextChange}
              rows={10}
              setText={setText}
            />
            {errors && errors.text ? (
              <FormHelperText className={classes.error}>{errors.text}</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            error={errors && errors.type ? true : false}
          >
            <InputLabel error={errors && errors.type ? true : false} htmlFor="filled-age-simple">
              Beitragstyp
            </InputLabel>
            <Select
              value={type}
              onChange={onTypeChange}
              input={<OutlinedInput name="type" id="filled-age-simple" />}
            >
              <MenuItem value="Tutorial">Tutorial</MenuItem>
              <MenuItem value="Blogartikel">Blogartikel</MenuItem>
              <MenuItem value="Diskussion">Diskussion</MenuItem>
              <MenuItem value="Idee">Idee</MenuItem>
              <MenuItem value="Projekt">Projekt</MenuItem>
              <MenuItem value="Frage">Frage</MenuItem>
              <MenuItem value="Fun">Fun</MenuItem>
            </Select>
            {errors && errors.type ? (
              <FormHelperText className={classes.error}>{errors.type}</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl className={classes.formControl} error>
            <TextField
              type="tags"
              error={errors && errors.title ? true : false}
              label="Hashtags"
              margin="normal"
              variant="outlined"
              name="tags"
              value={tagsInput}
              onChange={onTagsInputChange}
              onKeyDown={onTagsKeyPress}
            />
            {errors && errors.tags ? (
              <FormHelperText className={classes.error}>{errors.tags}</FormHelperText>
            ) : null}
          </FormControl>
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
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                className={classes.button}
                type="submit"
                color="primary"
                variant="outlined"
                onClick={() => onSubmit({ published: true })}
              >
                Veröffentlichen
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                type="submit"
                color="primary"
                variant="outlined"
                onClick={() => onSubmit({ published: false })}
              >
                Entwurf speichern
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

PostEdit.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}

export default PostEdit
