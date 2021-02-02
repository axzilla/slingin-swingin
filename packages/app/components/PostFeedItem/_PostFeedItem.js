// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

// Local Components
import Content from './components/Content'
import TitleImage from './components/TitleImage'
import Footer from './components/Footer'

// Global Components
import UserAvatar from '@components/UserAvatar'
import Link from '@components/Link'

// MUI
import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import LocationOnIcon from '@material-ui/icons/LocationOn'

const useStyles = makeStyles(theme => ({
  avatar: {
    border: `1px solid ${grey[900]}`
  },
  cardHeader: { paddingBottom: 0 },
  cardContentRoot: {
    '&:last-child': {
      paddingBottom: theme.spacing(1)
    }
  },
  media: { objectFit: 'cover' }
}))

function PostFeedItem({ post, style, hideImage, hideFooter, hidePlace }) {
  const classes = useStyles()
  const [postData, setPostData] = useState(post)

  return (
    <Card variant="outlined" style={style}>
      {!hideImage && <TitleImage post={postData} />}

      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Link href="/[username]" as={`/${post.user.username}`}>
            <UserAvatar user={post.user} />
          </Link>
        }
        title={
          <Link underlined href="/[username]" as={`/${post.user.username}`}>
            {post.user.username}
          </Link>
        }
        subheader={
          <small>
            <Moment fromNow>{post.dateCreated}</Moment>
          </small>
        }
      />

      <CardContent classes={{ root: classes.cardContentRoot }}>
        {post.place && !hidePlace && (
          <Grid container>
            <Box display="inline">
              <LocationOnIcon color="secondary" />
            </Box>
            <Link
              underlined
              href="/place/[shortId]/[urlSlug]"
              as={`/place/${post.place.shortId}/${post.place.urlSlug}`}
            >
              <Typography color="textSecondary" display="inline" gutterBottom>
                {post.place.mapBox.place_name}
              </Typography>
            </Link>
          </Grid>
        )}
        <Content post={postData} />
        {!hideFooter && <Footer post={postData} setPostData={setPostData} />}
      </CardContent>
    </Card>
  )
}

PostFeedItem.propTypes = {
  post: PropTypes.object,
  style: PropTypes.object,
  hideImage: PropTypes.bool,
  hideFooter: PropTypes.bool,
  hidePlace: PropTypes.bool
}

export default PostFeedItem
