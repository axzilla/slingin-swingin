import React from 'react'
import neuefischeImg from '../../assets/img/sponsors/neuefische.svg'
import digitialOceanImg from '../../assets/img/sponsors/digitalocean.svg'
import herokuImg from '../../assets/img/sponsors/heroku.png'

import { makeStyles } from '@material-ui/styles'

import {
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Divider,
  Box
} from '@material-ui/core'

const useStyles = makeStyles({
  divider: {
    margin: '20px 0'
  },
  img: {
    height: '30px',
    display: 'block'
  }
})

const TopHashTagCard = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          <Box fontFamily="Monospace" fontWeight={900}>
            @sehenswert
          </Box>
        </Typography>
        <Divider className={classes.divider} />
        <MuiLink href="https://www.neuefische.de/" target="_blank">
          <img className={classes.img} src={neuefischeImg} alt="Neue Fische" />
        </MuiLink>
        <Divider className={classes.divider} />
        <MuiLink href="https://www.digitalocean.com/" target="_blank">
          <img
            className={classes.img}
            src={digitialOceanImg}
            alt="Digital Ocean"
          />
        </MuiLink>
        <Divider className={classes.divider} />
        <MuiLink href="https://www.heroku.com/" target="_blank">
          <img className={classes.img} src={herokuImg} alt="Heroku" />
        </MuiLink>
      </CardContent>
    </Card>
  )
}

export default TopHashTagCard
