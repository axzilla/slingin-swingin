// Packages
import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import '../../utils/highlight'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'

// Actions
import { addPost } from './_actions'

// Assets
import placeholder from '../../assets/img/post-title-placeholder.png'
import '../../assets/css/quill.snow.css'

// Utils
import isEmpty from '../../utils/isEmpty'
import slugify from '../../utils/slugify'

// Components
import { modules, formats } from '../quill/quill'

// Material Styles
import { makeStyles } from '@material-ui/core/styles'

// Material Core
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

const PostCreate = props => {
  const classes = useStyles()

  const [errors, setErrors] = useState()
  const [titleImage, setTitleImage] = useState(null)
  const [titleImagePreview, setTitleImagePreview] = useState(null)
  const [tagsInput, setTagsInput] = useState('')
  const [postData, setPostdata] = useState({
    title: '',
    text: '',
    type: '',
    tags: []
  })

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
  }, [])

  useEffect(() => {
    setErrors(props.post.errors)
  }, [props.post.errors])

  const onSubmit = ({ published }) => {
    const formData = new FormData()
    formData.append('titleImage', titleImage)
    formData.append('title', postData.title)
    formData.append('text', postData.text)
    formData.append('type', postData.type)
    formData.append('tags', postData.tags)
    formData.append('published', published)
    props.addPost(formData, props.history)
  }

  const onPostTitleImageChange = e => {
    e.preventDefault()
    setTitleImagePreview(URL.createObjectURL(e.target.files[0]))
    setTitleImage(e.target.files[0])
  }

  const onDeleteTitleImageClick = e => {
    e.preventDefault()
    if (window.confirm('Bild löschen?')) {
      setTitleImagePreview(null)
      setTitleImage(null)
    }
  }

  const onReactQuillChange = e => {
    setPostdata({
      ...postData,
      text: e
    })
  }

  const onChange = e => {
    setPostdata({
      ...postData,
      [e.target.name]: e.target.value
    })
  }

  const onTagsInputChange = e => {
    setTagsInput(slugify(e.target.value))
  }

  const onTagsKeyPress = e => {
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

  const handleTagDelete = i => {
    setPostdata({
      ...postData,
      tags: [...postData.tags.slice(0, i), ...postData.tags.slice(i + 1)]
    })
  }

  const { isLoading } = props.post

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
              <FormHelperText className={classes.error}>
                {errors.title}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl className={classes.formControl} error>
            <ReactQuill
              className={classes.quill}
              theme="snow"
              modules={modules}
              formats={formats}
              value={postData.text}
              onChange={onReactQuillChange}
              error={errors && errors.text}
            />
            {errors && errors.text ? (
              <FormHelperText className={classes.error}>
                {errors.text}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            error={errors && errors.type ? true : false}
          >
            <InputLabel
              error={errors && errors.type ? true : false}
              htmlFor="filled-age-simple"
            >
              Beitragstyp
            </InputLabel>
            <Select
              value={postData.type}
              onChange={onChange}
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
              <FormHelperText className={classes.error}>
                {errors.type}
              </FormHelperText>
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
              <FormHelperText className={classes.error}>
                {errors.tags}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Grid>
            {postData.tags.map((tag, i) => {
              return (
                <Chip
                  key={i}
                  label={`#${tag}`}
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
                disabled={isLoading}
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
                disabled={isLoading}
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

const mapStateToProps = ({ post }) => ({ post })

const mapDispatchToProps = {
  addPost
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCreate)
