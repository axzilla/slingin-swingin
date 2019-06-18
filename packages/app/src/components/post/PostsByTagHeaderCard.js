import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, Typography, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: '20px'
  },
  typography: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3)
    }
  }
}))

function PostsByTagHeaderCard({ match }) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h3" component="h1" className={classes.typography}>
          <Box textAlign="center" fontWeight={500} fontFamily="Monospace">
            #{match.params.tag}
          </Box>
        </Typography>
      </CardContent>
    </Card>
  )
}

PostsByTagHeaderCard.propTypes = {
  match: PropTypes.object
}

export default PostsByTagHeaderCard
