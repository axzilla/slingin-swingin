// Packages
import { useState } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

// Global Components
import Link from '@components/Link'
import UserAvatar from '@components/UserAvatar'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  cardRoot: {
    backgroundColor: 'transparent',
    height: '100%',
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(10)
    }
  },
  cardHeaderRoot: { padding: 0 },
  cardContentRoot: { paddingLeft: 0, paddingRight: 0 },
  readmoreButton: { textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }
}))

function ReviewFeedItem({ review }) {
  const classes = useStyles()
  const [isReadMore, setIsReadmore] = useState(false)
  const charLimit = isReadMore ? 999999 : 200

  return (
    <Card classes={{ root: classes.cardRoot }} variant="outlined">
      <CardHeader
        classes={{ root: classes.cardHeaderRoot }}
        avatar={
          <Link href="/[handle]" as={`/${'badazzdev'}`}>
            <UserAvatar height={56} width={56} user={review.user} />
          </Link>
        }
        title={
          <Link underlined href="/[handle]" as={`/${'badazzdev'}`}>
            <Box fontWeight="bold">Axel</Box>
          </Link>
        }
        subheader={<Moment fromNow>{Date.now()}</Moment>}
      />
      <CardContent classes={{ root: classes.cardContentRoot }}>
        <Typography>
          {review.summary.substring(0, charLimit)}
          {review.summary.length > charLimit - 1 && '...'}
          {review.summary.length > charLimit - 1 && (
            <Box
              className={classes.readmoreButton}
              onClick={() => setIsReadmore(true)}
              fontWeight="fontWeightMedium"
            >
              read more
            </Box>
          )}
        </Typography>
      </CardContent>
    </Card>
  )
}

ReviewFeedItem.propTypes = {
  review: PropTypes.object.isRequired
}

export default ReviewFeedItem
