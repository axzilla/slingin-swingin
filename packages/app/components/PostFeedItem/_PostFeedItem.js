// Packages
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { useRouter } from 'next/router'
import { Gif } from '@giphy/react-components'
import ResizeObserver from 'react-resize-observer'

// Local Components
import Content from './components/Content'
import Footer from './components/Footer'

// Global Components
import UserAvatar from '@components/UserAvatar'
import Link from '@components/Link'

// MUI
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import LocationOnIcon from '@material-ui/icons/LocationOn'

import ScrollContext from '@contexts/ScrollContext'

function PostFeedItem({ post, style }) {
  const { scrollRef } = useContext(ScrollContext)
  const router = useRouter()
  const [postData, setPostData] = useState(post)
  const [width, setWidth] = useState()

  React.useEffect(() => {
    //called when the component has been mounted, sets the scroll to the currently stored scroll position
    window.scrollTo(0, scrollRef.current.scrollPos)

    const handleScrollPos = () => {
      //every time the window is scrolled, update the reference. This will not cause a re-render, meaning smooth uninterrupted scrolling.
      scrollRef.current.scrollPos = window.scrollY
    }

    window.addEventListener('scroll', handleScrollPos)

    return () => {
      //remove event listener on unmount
      window.removeEventListener('scroll', handleScrollPos)
    }
  })

  return (
    <Card variant="outlined" style={style}>
      <CardHeader
        avatar={
          <Link href="/[username]" as={`/${post.user.username}`}>
            <UserAvatar user={post.user} />
          </Link>
        }
        title={
          <Link color="textPrimary" underlined href="/[username]" as={`/${post.user.username}`}>
            <Typography display="inline">
              <Box display="inline" fontWeight="bold">
                {post.user.name}{' '}
              </Box>
              <Box color="text.secondary" display="inline">
                @{post.user.username}
              </Box>
            </Typography>
          </Link>
        }
        subheader={<Moment fromNow>{post.dateCreated}</Moment>}
      />

      <CardActionArea
        onClick={() => router.push(`/post/${post._id}`).then(() => window.scrollTo(0, 0))}
      >
        {post.place && (
          <CardContent>
            <Grid container>
              <Box display="inline">
                <LocationOnIcon color="secondary" />
              </Box>
              <Link
                color="textPrimary"
                underlined
                href="/place/[shortId]/[urlSlug]"
                as={`/place/${post.place.shortId}/${post.place.urlSlug}`}
              >
                <Typography color="textSecondary" display="inline" gutterBottom>
                  {post.place.mapBox.place_name}
                </Typography>
              </Link>
            </Grid>
          </CardContent>
        )}

        {postData.contentRaw && (
          <CardContent>
            <Content post={postData} />
          </CardContent>
        )}

        {postData.gif && (
          <CardContent>
            <Card>
              <ResizeObserver
                onResize={({ width }) => {
                  setWidth(width)
                }}
              />

              <Gif
                hideAttribution
                onGifClick={(gif, e) => e.preventDefault()}
                gif={postData.gif}
                width={width}
              />
            </Card>
          </CardContent>
        )}

        {postData.mediaFiles && (
          <CardContent>
            <Grid container spacing={1}>
              {postData.mediaFiles.map(mediaFile => {
                return (
                  <Grid item xs={6} key={mediaFile.cloudinary.secure_url}>
                    <Card>
                      <CardMedia image={mediaFile.cloudinary.secure_url}>
                        <Box height={125} />
                      </CardMedia>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>
        )}
      </CardActionArea>
      <CardContent>
        <Footer post={postData} setPostData={setPostData} />
      </CardContent>
    </Card>
  )
}

PostFeedItem.propTypes = {
  post: PropTypes.object,
  style: PropTypes.object
}

export default PostFeedItem
