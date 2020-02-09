import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import Title from './components/Title'
import TitleImage from './components/TitleImage'
import Tags from './components/Tags'
import Story from './components/Story'

import { postCreate, postUpdate } from '@services/post'
import Container from '@components/Container'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function PostForm({ post }) {
  const [errors, setErrors] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [titleImage, setTitleImage] = useState(null)
  const [titleImagePreview, setTitleImagePreview] = useState(
    post && post.titleImage ? post.titleImage.secure_url : null
  )
  const [title, setTitle] = useState(post ? post.title : '')
  const [content, setContent] = useState(post ? post.content : '')
  const [tags, setTags] = useState(post ? post.tags : [])
  const [tagsInput, setTagsInput] = useState('')

  async function onSubmit() {
    try {
      setIsLoading(true)

      const formData = new FormData()

      formData.append('titleImage', titleImage)
      formData.append('title', title)
      formData.append('content', content)
      formData.append('tags', tags)

      if (post) {
        formData.append('id', post._id)
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

      setIsLoading(false)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <Container maxWidth="sm">
      <Card>
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
              <Story content={content} setContent={setContent} errors={errors} />
            </Grid>
            <Grid item>
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
                disabled={isLoading}
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

PostForm.propTypes = {
  post: PropTypes.object
}

export default PostForm
