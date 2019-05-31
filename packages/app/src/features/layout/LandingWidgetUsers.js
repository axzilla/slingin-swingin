// Packages
import React from 'react'

// Components
import Link from '../../components/Link'
import CharAvatar from '../../components/avatars/CharAvatar'

// Material Core
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  avatar: {
    height: '75px',
    width: '75px',
    margin: '10px'
  },
  card: {
    marginBottom: '20px'
  }
}))

const LandingWidgetUsers = ({ profiles }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          <Box fontFamily="Monospace" fontWeight={900}>
            @neue mitglieder
          </Box>
        </Typography>
        {profiles &&
          profiles.slice(0, 5).map((profile, i) => {
            return (
              <Link key={i} to={`${profile.handle}`}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  direction="column"
                >
                  <Grid item xs>
                    {profile.user.avatar && profile.user.avatar.secure_url ? (
                      <Avatar
                        src={profile.user.avatar.secure_url}
                        className={classes.avatar}
                      />
                    ) : (
                      <CharAvatar
                        size="75px"
                        fontSize="30px"
                        charString={profile.user.username}
                        border="3px"
                      />
                    )}
                  </Grid>
                  <Grid item xs>
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      component="h3"
                    >
                      {profile.user.username}
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            )
          })}
      </CardContent>
    </Card>
  )
}

export default LandingWidgetUsers
