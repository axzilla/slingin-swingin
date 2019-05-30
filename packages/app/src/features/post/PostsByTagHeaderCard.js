// Packages
import React from 'react'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Card, CardContent, Typography, Box } from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    marginBottom: '20px'
  }
})

const PostsByTagHeaderCard = props => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h3" component="h1">
          <Box textAlign="center" fontWeight={500} fontFamily="Monospace">
            #{props.match.params.tag}
          </Box>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PostsByTagHeaderCard
