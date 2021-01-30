// MUI
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  bottomNavigationHack: {
    height: '56px',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}))

function BottomNavigationHack() {
  const classes = useStyles()
  return <div className={classes.bottomNavigationHack} />
}

export default BottomNavigationHack
