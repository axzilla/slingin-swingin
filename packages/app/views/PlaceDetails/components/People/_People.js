// Packages
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Global Components
import Link from '@components/Link'

// MUI
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

function People({ peopleCurrent, peopleBeen, peopleWant, baseData, type }) {
  const [open, setOpen] = useState(false)
  const [people, setPeople] = useState([])
  const [title, setTitle] = useState('')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const limit = 20

  useEffect(() => {
    setInitialData()
  }, [])

  function setInitialData() {
    if (type === 'current') {
      setTitle(`${peopleCurrent.length} people are currently in ${baseData.mapBox.text}`)
      setPeople(peopleCurrent)
    }

    if (type === 'been') {
      setTitle(`${peopleBeen.length} people have been in ${baseData.mapBox.text}`)
      setPeople(peopleBeen)
    }

    if (type === 'want') {
      setTitle(`${peopleWant.length} people want to go to ${baseData.mapBox.text}`)
      setPeople(peopleWant)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box mb={4}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box mb={2}>
        <Grid
          spacing={2}
          container
          wrap="nowrap"
          style={{ overflowX: 'scroll', scrollbarWidth: 'none' }}
        >
          {people &&
            people
              .map((user, index) => {
                return (
                  <Grid item key={index}>
                    <Link href="/[username]" as={`/${user.username}`}>
                      <Card style={{ backgroundColor: 'transparent' }} variant="outlined">
                        <CardContent>
                          <Avatar
                            src={user.avatar && user.avatar.secure_url}
                            style={{ height: '50px', width: '50px' }}
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                )
              })
              .slice(0, limit)}
        </Grid>
      </Box>

      {people.length > limit && (
        <Button variant="outlined" size="large" onClick={handleClickOpen}>
          Show all {people.length} people
        </Button>
      )}

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Grid spacing={2} container>
            {people.map((user, index) => {
              return (
                <Grid item key={index}>
                  <Link href="/[username]" as={`/${user.username}`}>
                    <Avatar src={user.avatar && user.avatar.secure_url} />
                  </Link>
                </Grid>
              )
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

People.propTypes = {
  baseData: PropTypes.object.isRequired,
  peopleCurrent: PropTypes.array,
  peopleBeen: PropTypes.array,
  peopleWant: PropTypes.array,
  type: PropTypes.string.isRequired
}

export default People
