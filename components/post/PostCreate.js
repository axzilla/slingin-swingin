import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { addPost } from './_services'
import MarkdownEditor from '../common/MarkdownEditor'
import placeholder from '../../assets/img/post-title-placeholder.png'
import isEmpty from '../../utils/isEmpty'
import slugify from '../../utils/slugify'
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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing(0.5)
  },
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

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  async function onSubmit() {
    try {
      const formData = new FormData()

      formData.append('titleImage', titleImage)
      formData.append('title', postData.title)
      formData.append('text', text)
      formData.append('type', postData.type)
      formData.append('tags', postData.tags)

      const res = await addPost(formData)
      const createdPost = res.data
      const { shortId, urlSlug } = createdPost

      Router.push(`/post/${shortId}/${urlSlug}`)
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
      setTitleImage(null)
    }
  }

  function onChange(e) {
    setPostdata({
      ...postData,
      [e.target.name]: e.target.value
    })
  }

  function onTextChange(e) {
    setText(e.target.value)
  }

  function onTagsInputChange(e) {
    setTagsInput(slugify(e.target.value))
  }

  function onTagsKeyPress(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
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
              value={postData.title}
              onChange={onChange}
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
            <InputLabel
              ref={inputLabel}
              htmlFor="outlined-type-simple"
              error={errors && errors.type ? true : false}
            >
              Beitragstyp
            </InputLabel>
            <Select
              value={postData.type}
              onChange={onChange}
              input={
                <OutlinedInput labelWidth={labelWidth} name="type" id="outlined-type-simple" />
              }
            >
              <MenuItem value="Tutorial">Tutorial</MenuItem>
              <MenuItem value="Blogartikel">Blogartikel</MenuItem>
              <MenuItem value="Diskussion">Diskussion</MenuItem>
              <MenuItem value="Idee">Idee</MenuItem>
              <MenuItem value="Projekt">Projekt</MenuItem>
              <MenuItem value="Frage">Frage</MenuItem>
              <MenuItem value="Fun">Fun</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} error>
            <TextField
              type="tags"
              label="Tags"
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
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                className={classes.button}
                color="primary"
                variant="outlined"
                onClick={onSubmit}
              >
                Speichern
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PostCreate
