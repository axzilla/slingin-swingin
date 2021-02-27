import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import FavoriteIcon from '@material-ui/icons/Favorite'

function Footer() {
  return (
    <Box width="100%" m={2}>
      <Grid container justify="center">
        <Box my={3}>
          <a
            href="https://www.producthunt.com/posts/digitalnomads-dev?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-digitalnomads-dev"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=285398&theme=light"
              alt="digitalnomads.dev - The #1 Digital Nomad Community | Product Hunt"
              style={{ width: '250px', height: '54px' }}
              width="250"
              height="54"
            />
          </a>
        </Box>
      </Grid>
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
