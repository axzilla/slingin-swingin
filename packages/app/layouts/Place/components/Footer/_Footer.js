import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import FavoriteIcon from '@material-ui/icons/Favorite'

function Footer() {
  return (
    <Box width="100%" m={2}>
      <Grid container alignItems="center" justify="center">
        <Typography variant="subtitle1">
          &copy; digitalnomads.dev {new Date().getFullYear()} - made with&nbsp;
        </Typography>
        <FavoriteIcon color="secondary" />
      </Grid>
    </Box>
  )
}

export default Footer
